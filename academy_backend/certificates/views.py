# # certificates/views.py
# from rest_framework import status, viewsets
# from rest_framework.response import Response
# from rest_framework.decorators import api_view, action, authentication_classes, permission_classes
# from rest_framework.permissions import AllowAny
# from bson import ObjectId
# from reportlab.pdfgen import canvas
# from reportlab.lib.pagesizes import A4
# from reportlab.lib.utils import ImageReader
# from django.http import FileResponse
# from django.conf import settings
# import io
# import os
# from datetime import datetime
# from dateutil import parser as date_parser
# from PIL import Image
# from .models import Certificate
# from courses.models import Course as MongoCourse
# from users.models import User as MongoUser
# from .authentication import MongoJWTAuthentication
# from .permissions import IsMongoAdmin
# from reportlab.pdfbase import pdfmetrics
# from reportlab.pdfbase.ttfonts import TTFont


# # ---------------------------
# # CONFIG: template path
# # ---------------------------
# TEMPLATE_PATHS_TO_TRY = [
#     r"C:\Users\ADMIN\Desktop\BM_Academy_React-main (2)\BM_Academy_React-main\academy_backend\certificate_template.png",
#     os.path.join(getattr(settings, "MEDIA_ROOT", ""), "certificate_template.png"),
#     os.path.join(getattr(settings, "STATIC_ROOT", ""), "certificate_template.png"),
#     os.path.join(getattr(settings, "BASE_DIR", ""), "certificate_template.png"),
# ]


# def find_template():
#     for p in TEMPLATE_PATHS_TO_TRY:
#         if p and os.path.exists(p):
#             return p
#     return None


# TEMPLATE_PATH = find_template()

# if not TEMPLATE_PATH:
#     print("⚠️ Certificate template PNG not found. Checked paths:", TEMPLATE_PATHS_TO_TRY)


# class CertificateViewSet(viewsets.ViewSet):
#     authentication_classes = [MongoJWTAuthentication]
#     permission_classes = [IsMongoAdmin]

#     # -------------------------------
#     # UTILITY: generate PDF using template
#     # -------------------------------
#     def _generate_pdf_from_template(self, name, course, issued_date_str, certificate_id):
#         if not TEMPLATE_PATH or not os.path.exists(TEMPLATE_PATH):
#             raise FileNotFoundError("Certificate template not found.")

#         # Parse date
#         if issued_date_str:
#             try:
#                 issued_dt = date_parser.parse(issued_date_str)
#             except Exception:
#                 issued_dt = datetime.utcnow()
#         else:
#             issued_dt = datetime.utcnow()

#         # Load PNG template to get exact size
#         img = Image.open(TEMPLATE_PATH)
#         width, height = img.size

#         # Output setup
#         cert_folder = os.path.join(settings.MEDIA_ROOT, "certificates")
#         os.makedirs(cert_folder, exist_ok=True)
#         filename = f"{certificate_id}.pdf"
#         file_path = os.path.join(cert_folder, filename)

#         buffer = io.BytesIO()
#         c = canvas.Canvas(buffer, pagesize=(width, height))

#         # Draw background template
#         bg = ImageReader(TEMPLATE_PATH)
#         c.drawImage(bg, 0, 0, width=width, height=height)

#         # ---------------------------------------------------------
#         # FONT REGISTRATION
#         # ---------------------------------------------------------
#         regular_font = "Helvetica"
#         bold_font = "Helvetica-Bold"

#         try:
#             if os.path.exists("Poppins-Regular.ttf") and os.path.exists("Poppins-Bold.ttf"):
#                 pdfmetrics.registerFont(TTFont("Poppins-Regular", "Poppins-Regular.ttf"))
#                 pdfmetrics.registerFont(TTFont("Poppins-Bold", "Poppins-Bold.ttf"))
#                 regular_font = "Poppins-Regular"
#                 bold_font = "Poppins-Bold"
#                 print("Custom Font Loaded Successfully")
#             else:
#                 print("Custom font files not found. Using Helvetica.")
#         except Exception as e:
#             print(f"Font loading error: {e}. Using Helvetica.")

#         # ---------------------------------------------------------
#         # FINAL ALIGNMENT WITH CUSTOM FONT
#         # ---------------------------------------------------------
#         center_x = width / 2
#         c.setFillColorRGB(0, 0, 0)

#         # Vertical placement
#         start_y = height * 0.55
#         line_gap = height * 0.085

#         # -------------------- Line 1 --------------------
#         c.setFont(regular_font, 90)
#         c.drawCentredString(
#             center_x, start_y, f"This certificate is awarded to Mr./Ms. {name.title()} for the"
#         )

#         # -------------------- Line 2 --------------------
#         c.setFont(bold_font, 120)
#         c.drawCentredString(center_x, start_y - line_gap, "successful completion of")

#         # -------------------- Line 3 (Course Name) --------------------
#         c.setFont(bold_font, 120)
#         c.drawCentredString(
#             center_x, start_y - (line_gap * 2.1), f"Professional certificate in {course.title()}"
#         )

#         # -------------------- Line 4 --------------------
#         c.setFont(bold_font, 120)
#         c.drawCentredString(center_x, start_y - (line_gap * 3.2), "")

#         # -------------------- Issued Date --------------------
#         c.setFont(regular_font, 55)
#         c.drawCentredString(center_x, height * 0.21, f"Issued on {issued_dt.strftime('%d %B %Y')}")

#         # -------------------- Certificate ID --------------------
#         c.setFont(regular_font, 35)
#         c.drawString(width * 0.04, height * 0.04, f"Certificate ID: {certificate_id}")

#         # Finish PDF
#         c.showPage()
#         c.save()
#         buffer.seek(0)

#         # Save to disk
#         with open(file_path, "wb") as f:
#             f.write(buffer.read())

#         return file_path, filename, cert_folder

#     # -------------------------------
#     # CREATE CERTIFICATE (auto - for enrolled users)
#     # -------------------------------
#     def create(self, request):
#         user_id = request.data.get("user_id")
#         course_id = request.data.get("course_id")

#         if not user_id or not course_id:
#             return Response({"error": "user_id and course_id are required"}, status=400)

#         certificate_id = "CERT" + str(int(datetime.now().timestamp()))
#         user_name = "Unknown User"
#         course_title = "Unknown Course"

#         # Fetch user
#         try:
#             user = MongoUser.objects(id=ObjectId(user_id)).first()
#             if user:
#                 user_name = user.name or user.email or "Unknown User"
#         except Exception as e:
#             print("⚠️ User fetch failed:", e)

#         # Fetch course
#         try:
#             course = MongoCourse.objects(id=ObjectId(course_id)).first()
#             if course:
#                 course_title = course.title
#         except Exception as e:
#             print("⚠️ Course fetch failed:", e)

#         # Generate PDF
#         try:
#             file_path, filename, cert_folder = self._generate_pdf_from_template(
#                 name=user_name,
#                 course=course_title,
#                 issued_date_str=None,
#                 certificate_id=certificate_id,
#             )
#         except Exception as e:
#             return Response({"error": f"PDF generation failed: {str(e)}"}, status=500)

#         file_url = f"{settings.MEDIA_URL}certificates/{filename}"

#         # Save certificate record
#         Certificate(
#             user_id=str(user_id),
#             course_id=str(course_id),
#             certificate_id=certificate_id,
#             file_url=file_url,
#         ).save()

#         return Response(
#             {
#                 "message": "Certificate issued successfully!",
#                 "data": {
#                     "certificate_id": certificate_id,
#                     "user_name": user_name,
#                     "course_name": course_title,
#                     "file": request.build_absolute_uri(file_url),
#                 },
#             },
#             status=201,
#         )

#     # -------------------------------
#     # LIST ALL CERTIFICATES (admin)
#     # -------------------------------
#     def list(self, request):
#         certificates = Certificate.objects.order_by("-issue_date")
#         data = []

#         for cert in certificates:
#             user_name = cert.manual_name or "Unknown User"
#             course_name = cert.manual_course or "Unknown Course"

#             if cert.user_id:
#                 try:
#                     user = MongoUser.objects(id=ObjectId(cert.user_id)).first()
#                     if user:
#                         user_name = user.name or user.email or "Unknown User"
#                 except:
#                     pass

#             if cert.course_id:
#                 try:
#                     course = MongoCourse.objects(id=ObjectId(cert.course_id)).first()
#                     if course:
#                         course_name = course.title
#                 except:
#                     pass

#             data.append(
#                 {
#                     "certificate_id": cert.certificate_id,
#                     "user_name": user_name,
#                     "course_name": course_name,
#                     "certificate_type": getattr(cert, "certificate_type", "Course"),
#                     "issue_date": cert.issue_date,
#                     "file": request.build_absolute_uri(cert.file_url),
#                 }
#             )

#         return Response({"data": data}, status=200)

#     # -------------------------------
#     # MANUAL CERTIFICATE (public endpoint)
#     # -------------------------------
#     @action(
#         detail=False,
#         methods=["POST"],
#         url_path="manual",
#         authentication_classes=[],
#         permission_classes=[AllowAny],
#     )
#     def manual_certificate(self, request):
#         name = request.data.get("name")
#         course = request.data.get("course")
#         issued_date = request.data.get("issued_date")
#         certificate_type = request.data.get("certificate_type", "Course")

#         if not name or not course:
#             return Response({"error": "name and course are required"}, status=400)

#         certificate_id = "CERT" + str(int(datetime.now().timestamp()))

#         try:
#             file_path, filename, cert_folder = self._generate_pdf_from_template(
#                 name=name, course=course, issued_date_str=issued_date, certificate_id=certificate_id
#             )
#         except Exception as e:
#             return Response({"error": f"PDF generation failed: {str(e)}"}, status=500)

#         file_url = f"{settings.MEDIA_URL}certificates/{filename}"

#         Certificate(
#             user_id=None,
#             course_id=None,
#             manual_name=name,
#             manual_course=course,
#             certificate_type=certificate_type,
#             certificate_id=certificate_id,
#             file_url=file_url,
#         ).save()

#         return Response(
#             {
#                 "message": "Manual certificate generated!",
#                 "certificate_id": certificate_id,
#                 "name": name,
#                 "course": course,
#                 "file": request.build_absolute_uri(file_url),
#             },
#             status=201,
#         )


# # -------------------------------
# # VERIFY CERTIFICATE (public)
# # -------------------------------
# @api_view(["GET"])
# @authentication_classes([])
# @permission_classes([AllowAny])
# def verify_certificate(request, certificate_id):
#     cert = Certificate.objects(certificate_id=certificate_id).first()
#     if not cert:
#         return Response({"valid": False, "message": "Certificate not found"}, status=404)

#     user_name = cert.manual_name or "Unknown User"
#     course_name = cert.manual_course or "Unknown Course"

#     if cert.user_id:
#         try:
#             user = MongoUser.objects(id=ObjectId(cert.user_id)).first()
#             if user:
#                 user_name = user.name or user.email or "Unknown User"
#         except:
#             pass

#     if cert.course_id:
#         try:
#             course = MongoCourse.objects(id=ObjectId(cert.course_id)).first()
#             if course:
#                 course_name = course.title
#         except:
#             pass

#     return Response(
#         {
#             "valid": True,
#             "name": user_name,
#             "course": course_name,
#             "issuedDate": cert.issue_date.strftime("%d %B %Y"),
#             "file": request.build_absolute_uri(cert.file_url),
#         }
#     )


# # -------------------------------
# # DOWNLOAD CERTIFICATE (public)
# # -------------------------------
# @api_view(["GET"])
# @authentication_classes([])
# @permission_classes([AllowAny])
# def download_certificate(request, certificate_id):
#     cert = Certificate.objects(certificate_id=certificate_id).first()

#     if not cert:
#         return Response({"error": "Certificate not found"}, status=404)

#     relative_path = cert.file_url.replace(settings.MEDIA_URL, "", 1).lstrip("/")
#     file_path = os.path.join(settings.MEDIA_ROOT, relative_path)

#     if not os.path.exists(file_path):
#         return Response({"error": "Certificate file not found on server"}, status=404)

#     return FileResponse(open(file_path, "rb"), as_attachment=True, filename=f"{certificate_id}.pdf")


# certificates/views.py
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from bson import ObjectId
from django.conf import settings
from datetime import datetime
from dateutil import parser as date_parser
from .models import Certificate
from courses.models import Course as MongoCourse
from users.models import User as MongoUser
from .authentication import MongoJWTAuthentication
from .permissions import IsMongoAdmin
from django.http import FileResponse, Http404
import os


# ---------------------------------------------------------
#  UTILITY: CREATE UNIQUE CERTIFICATE ID
# ---------------------------------------------------------
def generate_certificate_id():
    year = datetime.now().year

    # Count certificates issued in the current year
    count = (
        Certificate.objects(
            issue_date__gte=datetime(year, 1, 1),
            issue_date__lte=datetime(year, 12, 31),
        ).count()
        + 1
    )

    return f"BMACERT-{year}-{count:04d}"


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

        certificate_id = generate_certificate_id()

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
            issue_date=datetime.utcnow(),
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
                    "issued_date": datetime.utcnow().strftime("%Y-%m-%d"),
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
        issued_date = request.data.get("issued_date")
        certificate_type = request.data.get("certificate_type", "Course")

        if not name or not course:
            return Response({"error": "name and course are required"}, status=400)

        certificate_id = generate_certificate_id()

        # Convert date
        try:
            issued_dt = date_parser.parse(issued_date) if issued_date else datetime.utcnow()
        except:
            issued_dt = datetime.utcnow()

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
        certificates = Certificate.objects.order_by("-issue_date")
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

import os
from django.http import FileResponse, Http404


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
