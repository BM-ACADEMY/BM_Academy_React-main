# certificates/views.py
from datetime import datetime, timedelta
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from bson import ObjectId
from django.conf import settings
from dateutil import parser as date_parser
from .models import Certificate
from courses.models import Course as MongoCourse
from users.models import User as MongoUser
from .authentication import MongoJWTAuthentication
from .permissions import IsMongoAdmin
from django.http import FileResponse, Http404
import os


# ---------------------------------------------------------
#  UTILITY: CREATE UNIQUE CERTIFICATE ID BASED ON ISSUE YEAR
# ---------------------------------------------------------
def generate_certificate_id(target_date=None):
    # If a specific date is provided, use that year. Otherwise, use current year.
    if target_date:
        year = target_date.year
    else:
        year = datetime.utcnow().year

    # Find the last certificate created for THIS specific year
    last_cert = (
        Certificate.objects(certificate_id__startswith=f"BMACERT-{year}-")
        .order_by("-certificate_id")
        .first()
    )

    if last_cert:
        # Extract the number part and increment
        last_number = int(last_cert.certificate_id.split("-")[-1])
        next_number = last_number + 1
    else:
        next_number = 1

    return f"BMACERT-{year}-{next_number:04d}"


class CertificateViewSet(viewsets.ViewSet):
    authentication_classes = [MongoJWTAuthentication]
    permission_classes = [IsMongoAdmin]

    # ---------------------------------------------------------
    # AUTO CERTIFICATE (user + course)
    # ---------------------------------------------------------
    def create(self, request):
        user_id = request.data.get("user_id")
        course_id = request.data.get("course_id")

        if not user_id or not course_id:
            return Response({"error": "user_id and course_id are required"}, status=400)

        # For auto-issue, we use the current time
        current_time = datetime.utcnow()

        # Generate ID based on current time
        certificate_id = generate_certificate_id(current_time)

        # Fetch user
        user = MongoUser.objects(id=ObjectId(user_id)).first()
        user_name = user.name if user else "Unknown User"

        # Fetch course
        course = MongoCourse.objects(id=ObjectId(course_id)).first()
        course_title = course.title if course else "Unknown Course"

        # Save in DB
        Certificate(
            user_id=str(user_id),
            course_id=str(course_id),
            certificate_id=certificate_id,
            issue_date=current_time,
        ).save()

        # Return info (React generates PDF)
        return Response(
            {
                "message": "Certificate created successfully",
                "data": {
                    "certificate_id": certificate_id,
                    "name": user_name,
                    "course": course_title,
                    "certificate_type": "Course",
                    "issued_date": current_time.strftime("%Y-%m-%d"),
                },
            },
            status=201,
        )

    # ---------------------------------------------------------
    # MANUAL CERTIFICATE
    # ---------------------------------------------------------
    @action(
        detail=False,
        methods=["POST"],
        url_path="manual",
        authentication_classes=[],
        permission_classes=[AllowAny],
    )
    def manual_certificate(self, request):
        name = request.data.get("name")
        course = request.data.get("course")
        issued_date_str = request.data.get("issued_date")
        certificate_type = request.data.get("certificate_type", "Course")

        if not name or not course:
            return Response({"error": "name and course are required"}, status=400)

        # 1. Parse the Issue Date FIRST
        try:
            if issued_date_str:
                issued_dt = date_parser.parse(issued_date_str)
            else:
                issued_dt = datetime.utcnow()
        except:
            issued_dt = datetime.utcnow()

        # 2. Generate ID using the PARSED DATE (so Year matches)
        certificate_id = generate_certificate_id(issued_dt)

        # Save in DB
        Certificate(
            manual_name=name,
            manual_course=course,
            certificate_type=certificate_type,
            certificate_id=certificate_id,
            issue_date=issued_dt,
        ).save()

        return Response(
            {
                "message": "Manual certificate created",
                "certificate_id": certificate_id,
                "name": name,
                "course": course,
                "certificate_type": certificate_type,
                "issued_date": issued_dt.strftime("%Y-%m-%d"),
            },
            status=201,
        )

    # ---------------------------------------------------------
    # LIST ALL CERTIFICATES
    # ---------------------------------------------------------
    def list(self, request):
        certificates = Certificate.objects.all()

        # 🔹 Dashboard filters
        range_param = request.query_params.get("range")
        from_date = request.query_params.get("from")
        to_date = request.query_params.get("to")

        now_dt = datetime.utcnow()

        # 🔹 TODAY
        if range_param == "today":
            start = now_dt.replace(hour=0, minute=0, second=0, microsecond=0)
            end = start + timedelta(days=1)
            certificates = certificates.filter(issue_date__gte=start, issue_date__lt=end)

        # 🔹 LAST 7 DAYS
        elif range_param == "7":
            certificates = certificates.filter(issue_date__gte=now_dt - timedelta(days=7))

        # 🔹 LAST 30 DAYS
        elif range_param == "30":
            certificates = certificates.filter(issue_date__gte=now_dt - timedelta(days=30))

        # 🔹 CUSTOM RANGE
        elif from_date and to_date:
            start = datetime.fromisoformat(from_date)
            end = datetime.fromisoformat(to_date) + timedelta(days=1)
            certificates = certificates.filter(issue_date__gte=start, issue_date__lt=end)

        certificates = certificates.order_by("-issue_date")

        data = []
        for cert in certificates:
            # Automatic certificate
            if cert.user_id:
                user = MongoUser.objects(id=ObjectId(cert.user_id)).first()
                user_name = user.name if user else "Unknown User"

                course = MongoCourse.objects(id=ObjectId(cert.course_id)).first()
                course_name = course.title if course else "Unknown Course"
            else:
                # Manual certificate
                user_name = cert.manual_name
                course_name = cert.manual_course

            data.append(
                {
                    "certificate_id": cert.certificate_id,
                    "user_name": user_name,
                    "course_name": course_name,
                    "certificate_type": cert.certificate_type,
                    "issue_date": cert.issue_date,
                }
            )

        return Response({"data": data}, status=200)

    # ---------------------------------------------------------
    # DELETE CERTIFICATE
    # ---------------------------------------------------------
    def destroy(self, request, pk=None):
        # 'pk' here will be the certificate_id from the URL (e.g. BMACERT-2026-XXXX)

        # 1. Find the certificate by its custom string ID
        cert = Certificate.objects(certificate_id=pk).first()

        # 2. If not found, check if 'pk' is a MongoDB ObjectId (fallback)
        if not cert and ObjectId.is_valid(pk):
            cert = Certificate.objects(id=ObjectId(pk)).first()

        # 3. If still not found, return 404
        if not cert:
            return Response({"error": "Certificate not found"}, status=404)

        # 4. Delete and return success
        cert.delete()
        return Response(
            {"message": "Certificate deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )


# ---------------------------------------------------------
# VERIFY CERTIFICATE (public)
# ---------------------------------------------------------
@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def verify_certificate(request, certificate_id):
    cert = Certificate.objects(certificate_id=certificate_id).first()

    if not cert:
        return Response({"valid": False, "message": "Certificate not found"}, status=404)

    if cert.user_id:
        user = MongoUser.objects(id=ObjectId(cert.user_id)).first()
        user_name = user.name if user else "Unknown User"

        course = MongoCourse.objects(id=ObjectId(cert.course_id)).first()
        course_name = course.title if course else "Unknown Course"
    else:
        user_name = cert.manual_name
        course_name = cert.manual_course

    return Response(
        {
            "valid": True,
            "name": user_name,
            "course": course_name,
            "issuedDate": cert.issue_date.strftime("%d %B %Y"),
        }
    )

@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def download_certificate(request, certificate_id):
    cert = Certificate.objects(certificate_id=certificate_id).first()

    if not cert:
        raise Http404("Certificate not found")

    # Certificate must have file_path stored
    if not cert.file_path:
        raise Http404("Certificate PDF not stored")

    file_path = cert.file_path

    # Ensure file exists on disk
    if not os.path.exists(file_path):
        raise Http404("Certificate file missing on server")

    return FileResponse(
        open(file_path, "rb"),
        content_type="application/pdf",
        as_attachment=True,
        filename=f"BM_CERT_{certificate_id}.pdf",
    )
