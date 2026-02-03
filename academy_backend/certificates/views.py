from datetime import datetime, timedelta
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from bson import ObjectId
from dateutil import parser as date_parser
from django.http import FileResponse, Http404
import os

from .models import Certificate
from courses.models import Course as MongoCourse
from users.models import User as MongoUser
from .authentication import MongoJWTAuthentication
from .permissions import IsMongoAdmin


# ---------------------------------------------------------
# AUTO CERTIFICATE ID (UNCHANGED)
# ---------------------------------------------------------
def generate_certificate_id(target_date=None):
    year = target_date.year if target_date else datetime.utcnow().year

    last_cert = (
        Certificate.objects(certificate_id__startswith=f"BMACERT-{year}-")
        .order_by("-certificate_id")
        .first()
    )

    if last_cert:
        last_number = int(last_cert.certificate_id.split("-")[-1])
        next_number = last_number + 1
    else:
        next_number = 1

    return f"BMACERT-{year}-{next_number:04d}"


# ---------------------------------------------------------
# CERTIFICATE VIEWSET
# ---------------------------------------------------------
class CertificateViewSet(viewsets.ViewSet):
    authentication_classes = [MongoJWTAuthentication]
    permission_classes = [IsMongoAdmin]

    # -----------------------------
    # INTERNAL HELPERS (MANUAL)
    # -----------------------------
    def _get_course_code(self, course_name):
        if not course_name:
            return "XX"

        words = course_name.strip().split()

        if len(words) == 2:
            return (words[0][0] + words[1][0]).upper()

        if len(words) >= 3:
            return (words[0][0] + words[1][0] + words[2][0]).upper()

        return words[0][:2].upper()

    def _generate_manual_certificate_id(self, course_name, issued_date=None):
        year = issued_date.year if issued_date else datetime.utcnow().year
        course_code = self._get_course_code(course_name)

        prefix = f"BM{course_code}{year}"

        last_cert = (
            Certificate.objects(certificate_id__startswith=prefix, manual_course=course_name)
            .order_by("-certificate_id")
            .first()
        )

        if last_cert:
            last_number = int(last_cert.certificate_id[-3:])
            next_number = last_number + 1
        else:
            next_number = 1

        return f"{prefix}{next_number:03d}"

    # ---------------------------------------------------------
    # AUTO CERTIFICATE
    # ---------------------------------------------------------
    def create(self, request):
        user_id = request.data.get("user_id")
        course_id = request.data.get("course_id")

        if not user_id or not course_id:
            return Response(
                {"error": "user_id and course_id are required"}, status=status.HTTP_400_BAD_REQUEST
            )

        current_time = datetime.utcnow()
        certificate_id = generate_certificate_id(current_time)

        user = MongoUser.objects(id=ObjectId(user_id)).first()
        user_name = user.name if user else "Unknown User"

        course = MongoCourse.objects(id=ObjectId(course_id)).first()
        course_title = course.title if course else "Unknown Course"

        Certificate(
            user_id=str(user_id),
            course_id=str(course_id),
            certificate_id=certificate_id,
            issue_date=current_time,
        ).save()

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
            status=status.HTTP_201_CREATED,
        )

    # ---------------------------------------------------------
    # MANUAL CERTIFICATE (UPDATED FORMAT)
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
            return Response(
                {"error": "name and course are required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            issued_dt = date_parser.parse(issued_date_str) if issued_date_str else datetime.utcnow()
        except Exception:
            issued_dt = datetime.utcnow()

        certificate_id = self._generate_manual_certificate_id(course, issued_dt)

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
            status=status.HTTP_201_CREATED,
        )

    # ---------------------------------------------------------
    # LIST CERTIFICATES
    # ---------------------------------------------------------
    def list(self, request):
        certificates = Certificate.objects.all()

        range_param = request.query_params.get("range")
        from_date = request.query_params.get("from")
        to_date = request.query_params.get("to")

        now_dt = datetime.utcnow()

        if range_param == "today":
            start = now_dt.replace(hour=0, minute=0, second=0, microsecond=0)
            end = start + timedelta(days=1)
            certificates = certificates.filter(issue_date__gte=start, issue_date__lt=end)

        elif range_param == "7":
            certificates = certificates.filter(issue_date__gte=now_dt - timedelta(days=7))

        elif range_param == "30":
            certificates = certificates.filter(issue_date__gte=now_dt - timedelta(days=30))

        elif from_date and to_date:
            start = datetime.fromisoformat(from_date)
            end = datetime.fromisoformat(to_date) + timedelta(days=1)
            certificates = certificates.filter(issue_date__gte=start, issue_date__lt=end)

        certificates = certificates.order_by("-issue_date")

        data = []
        for cert in certificates:
            if cert.user_id:
                user = MongoUser.objects(id=ObjectId(cert.user_id)).first()
                user_name = user.name if user else "Unknown User"

                course = MongoCourse.objects(id=ObjectId(cert.course_id)).first()
                course_name = course.title if course else "Unknown Course"
            else:
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

        return Response({"data": data}, status=status.HTTP_200_OK)

    # ---------------------------------------------------------
    # DELETE CERTIFICATE
    # ---------------------------------------------------------
    def destroy(self, request, pk=None):
        cert = Certificate.objects(certificate_id=pk).first()

        if not cert and ObjectId.is_valid(pk):
            cert = Certificate.objects(id=ObjectId(pk)).first()

        if not cert:
            return Response({"error": "Certificate not found"}, status=status.HTTP_404_NOT_FOUND)

        cert.delete()
        return Response(
            {"message": "Certificate deleted successfully"}, status=status.HTTP_204_NO_CONTENT
        )


# ---------------------------------------------------------
# VERIFY CERTIFICATE (PUBLIC)
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


# ---------------------------------------------------------
# DOWNLOAD CERTIFICATE (PUBLIC)
# ---------------------------------------------------------
@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def download_certificate(request, certificate_id):
    cert = Certificate.objects(certificate_id=certificate_id).first()

    if not cert:
        raise Http404("Certificate not found")

    if not cert.file_path:
        raise Http404("Certificate PDF not stored")

    if not os.path.exists(cert.file_path):
        raise Http404("Certificate file missing on server")

    return FileResponse(
        open(cert.file_path, "rb"),
        content_type="application/pdf",
        as_attachment=True,
        filename=f"BM_CERT_{certificate_id}.pdf",
    )
