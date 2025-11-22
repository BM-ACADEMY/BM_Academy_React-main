# certificates/views.py
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from bson import ObjectId
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from django.core.files.base import ContentFile
from django.http import FileResponse
from django.conf import settings
import io, os
from datetime import datetime

from .models import Certificate
from courses.models import Course as MongoCourse
from users.models import User as MongoUser
from .authentication import MongoJWTAuthentication
from .permissions import IsMongoAdmin


class CertificateViewSet(viewsets.ViewSet):
    authentication_classes = [MongoJWTAuthentication]
    permission_classes = [IsMongoAdmin]

    # -------------------------------
    # CREATE CERTIFICATE
    # -------------------------------
    def create(self, request):
        user_id = request.data.get("user_id")
        course_id = request.data.get("course_id")

        if not user_id or not course_id:
            return Response({"error": "user_id and course_id are required"}, status=400)

        certificate_id = "CERT" + str(int(datetime.now().timestamp()))
        user_name, course_title = "Unknown User", "Unknown Course"

        # Fetch user info
        try:
            user = MongoUser.objects(id=ObjectId(user_id)).first()
            if user:
                user_name = getattr(user, "name", None) or getattr(user, "email", "Unknown User")
        except Exception as e:
            print("⚠️ User fetch failed:", e)

        # Fetch course info
        try:
            course = MongoCourse.objects(id=ObjectId(course_id)).first()
            if course:
                course_title = course.title
        except Exception as e:
            print("⚠️ Course fetch failed:", e)

        # Generate PDF
        buffer = io.BytesIO()
        pdf = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4

        pdf.setTitle("BM Academy Certificate")
        pdf.setFont("Helvetica-Bold", 26)
        pdf.drawCentredString(width / 2, height - 100, "BM ACADEMY")
        pdf.setFont("Helvetica-Bold", 22)
        pdf.drawCentredString(width / 2, height - 160, "Certificate of Achievement")
        pdf.setFont("Helvetica", 16)
        pdf.drawCentredString(width / 2, height - 220, "This is proudly presented to")
        pdf.setFont("Helvetica-Bold", 20)
        pdf.drawCentredString(width / 2, height - 260, user_name)
        pdf.setFont("Helvetica", 14)
        pdf.drawCentredString(width / 2, height - 300, "For successfully completing:")
        pdf.setFont("Helvetica-Bold", 16)
        pdf.drawCentredString(width / 2, height - 330, course_title)
        pdf.setFont("Helvetica", 12)
        pdf.drawCentredString(width / 2, height - 380,
            f"Issued on: {datetime.now().strftime('%d %B %Y')}"
        )
        pdf.line(100, height - 420, width - 100, height - 420)
        pdf.setFont("Helvetica-Oblique", 10)
        pdf.drawCentredString(width / 2, height - 440, "Authorized by BM Academy")
        pdf.showPage()
        pdf.save()
        buffer.seek(0)

        # Save PDF to static folder
        cert_folder = os.path.join(settings.MEDIA_ROOT, "certificates")
        os.makedirs(cert_folder, exist_ok=True)
        filename = f"{certificate_id}.pdf"
        file_path = os.path.join(cert_folder, filename)

        with open(file_path, "wb") as f:
            f.write(buffer.read())

        file_url = f"{settings.MEDIA_URL}certificates/{filename}"

        # Save to MongoDB
        Certificate(
            user_id=user_id,
            course_id=course_id,
            certificate_id=certificate_id,
            file_url=file_url
        ).save()

        return Response({
            "message": "Certificate issued successfully!",
            "data": {
                "certificate_id": certificate_id,
                "user_name": user_name,
                "course_name": course_title,
                "file": request.build_absolute_uri(file_url)
            }
        }, status=status.HTTP_201_CREATED)

    # -------------------------------
    # LIST CERTIFICATES
    # -------------------------------
    def list(self, request):
        certificates = Certificate.objects.order_by("-issue_date")
        data = []

        for cert in certificates:
            user_name, course_name = "Unknown User", "Unknown Course"

            try:
                user = MongoUser.objects(id=ObjectId(cert.user_id)).first()
                if user:
                    user_name = getattr(user, "name", None) or getattr(user, "email", "Unknown User")
            except:
                pass

            try:
                course = MongoCourse.objects(id=ObjectId(cert.course_id)).first()
                if course:
                    course_name = course.title
            except:
                pass

            data.append({
                "certificate_id": cert.certificate_id,
                "user_name": user_name,
                "course_name": course_name,
                "issue_date": cert.issue_date,
                "file": request.build_absolute_uri(cert.file_url),
            })

        return Response({"data": data}, status=200)


# -------------------------------
# VERIFY CERTIFICATE
# -------------------------------
@api_view(["GET"])
def verify_certificate(request, certificate_id):
    cert = Certificate.objects(certificate_id=certificate_id).first()
    if not cert:
        return Response({"valid": False})

    user_name, course_name = "Unknown User", "Unknown Course"

    try:
        user = MongoUser.objects(id=ObjectId(cert.user_id)).first()
        if user:
            user_name = getattr(user, "name", None) or getattr(user, "email", "Unknown User")
    except:
        pass

    try:
        course = MongoCourse.objects(id=ObjectId(cert.course_id)).first()
        if course:
            course_name = course.title
    except:
        pass

    return Response({
        "valid": True,
        "name": user_name,
        "course": course_name,
        "issuedDate": cert.issue_date.strftime("%d %B %Y"),
        "file": request.build_absolute_uri(cert.file_url)
    })


# -------------------------------
# DOWNLOAD CERTIFICATE
# -------------------------------
@api_view(["GET"])
def download_certificate(request, certificate_id):
    cert = Certificate.objects(certificate_id=certificate_id).first()
    if not cert:
        return Response({"error": "Certificate not found"}, status=404)

    file_path = os.path.join(settings.MEDIA_ROOT, cert.file_url.replace(settings.MEDIA_URL, ""))
    if not os.path.exists(file_path):
        return Response({"error": "File not found"}, status=404)

    return FileResponse(open(file_path, "rb"), as_attachment=True, filename=f"{cert.certificate_id}.pdf")
