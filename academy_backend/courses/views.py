from datetime import datetime, timedelta
import os
import razorpay
from bson import ObjectId
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import Http404
from bson import ObjectId
from django.conf import settings
from django.http import Http404
from django.core.files.storage import default_storage
from django.utils.timezone import now
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from bson import ObjectId
from django.core.files.storage import default_storage
from django.conf import settings
from .models import Category, SubCategory
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from bson import ObjectId
from django.core.files.storage import default_storage
from django.conf import settings

from .models import (
    Category,
    SubCategory,
    Course,
    Payment,
    EnrolledCourse,
)
from .serializers import CourseSerializer
from users.models import User
from bson import ObjectId
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from bson import ObjectId
from .models import Course, SubCategory


from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage


class CategoryListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        categories = Category.objects.order_by("-created_at")
        return Response([{"id": str(c.id), "name": c.name, "image": c.image} for c in categories])

    def post(self, request):
        name = request.data.get("name", "").strip()
        image = request.FILES.get("image")

        if not name:
            return Response({"name": ["This field is required"]}, status=400)

        image_url = None
        if image:
            filename = default_storage.save(f"categories/{image.name}", image)
            image_url = f"{settings.SITE_URL}{settings.MEDIA_URL}{filename}"

        category = Category(name=name, image=image_url)
        category.save()

        return Response(
            {
                "id": str(category.id),
                "name": category.name,
                "image": category.image,
            },
            status=status.HTTP_201_CREATED,
        )


class CategoryDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, category_id):
        try:
            category = Category.objects.get(id=ObjectId(category_id))
        except Category.DoesNotExist:
            return Response(
                {"error": "Category not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:
            return Response(
                {"error": "Invalid category ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        name = request.data.get("name", "").strip()
        image = request.FILES.get("image")

        if not name:
            return Response(
                {"name": ["This field is required"]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 🔒 Prevent duplicate category name
        if Category.objects.filter(name__iexact=name, id__ne=category.id).first():
            return Response(
                {"name": ["Category already exists"]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        category.name = name

        # 🔄 Update image if provided
        if image:
            filename = default_storage.save(f"categories/{image.name}", image)
            category.image = f"{settings.SITE_URL}{settings.MEDIA_URL}{filename}"

        category.save()

        return Response(
            {
                "id": str(category.id),
                "name": category.name,
                "image": category.image,
            },
            status=status.HTTP_200_OK,
        )

    def delete(self, request, category_id):
        try:
            category = Category.objects.get(id=ObjectId(category_id))
        except Category.DoesNotExist:
            return Response(
                {"error": "Category not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:
            return Response(
                {"error": "Invalid category ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 🚫 Prevent delete if subcategories exist
        if SubCategory.objects.filter(category=category).count() > 0:
            return Response(
                {"error": "Cannot delete category with sub-categories"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        category.delete()

        return Response(
            {"message": "Category deleted successfully"},
            status=status.HTTP_200_OK,
        )


class PublicCategoryListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = Category.objects.order_by("-created_at")
        return Response(
            [
                {
                    "id": str(c.id),
                    "name": c.name,
                    "image": c.image,
                }
                for c in categories
            ]
        )


class SubCategoryListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    # ✅ LIST
    def get(self, request):
        subs = SubCategory.objects.all().order_by("-created_at")

        data = []
        for s in subs:
            data.append(
                {
                    "id": str(s.id),
                    "name": s.name,
                    "image": s.image,
                    "language": s.language,
                    "duration": s.duration,
                    "mode": s.mode,
                    "offer_label": s.offer_label,
                    # ✅ PRICE FIELDS
                    "price": s.price,
                    "offer_percentage": s.offer_percentage,
                    "is_free": s.is_free,
                    "category_id": str(s.category.id),
                    "category_name": s.category.name,
                }
            )

        return Response(data)

    # ✅ CREATE
    def post(self, request):
        category_id = request.data.get("category_id")
        if not category_id:
            return Response({"category_id": ["This field is required"]}, status=400)

        try:
            category = Category.objects.get(id=ObjectId(category_id))
        except Exception:
            return Response({"category_id": ["Invalid category id"]}, status=400)

        name = request.data.get("name", "").strip()
        if not name:
            return Response({"name": ["This field is required"]}, status=400)

        # ✅ PRICE PARSING (FIX)
        try:
            price = float(request.data.get("price", 0))
        except ValueError:
            return Response({"price": ["Invalid value"]}, status=400)

        offer = request.data.get("offer_percentage")
        offer = int(offer) if offer else None

        is_free = request.data.get("is_free") == "true"

        image_url = None
        image_file = request.FILES.get("image")
        if image_file:
            filename = default_storage.save(f"sub_categories/{image_file.name}", image_file)
            image_url = f"{settings.SITE_URL}{settings.MEDIA_URL}{filename}"

        sub = SubCategory(
            category=category,
            name=name,
            image=image_url,
            language=request.data.getlist("language"),
            duration=request.data.get("duration"),
            mode=request.data.getlist("mode"),
            offer_label=request.data.get("offer_label"),
            # ✅ SAVED CORRECTLY
            price=price,
            offer_percentage=offer,
            is_free=is_free,
        )
        sub.save()

        return Response(
            {
                "id": str(sub.id),
                "name": sub.name,
                "image": sub.image,
            },
            status=201,
        )


class SubCategoryDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    # ✏️ EDIT
    def put(self, request, sub_category_id):
        try:
            sub = SubCategory.objects.get(id=ObjectId(sub_category_id))
        except SubCategory.DoesNotExist:
            return Response(
                {"error": "SubCategory not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:
            return Response(
                {"error": "Invalid sub_category id"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        name = request.data.get("name", "").strip()
        category_id = request.data.get("category_id")
        image_file = request.FILES.get("image")

        if name:
            sub.name = name

        if category_id:
            try:
                category = Category.objects.get(id=ObjectId(category_id))
                sub.category = category
            except Category.DoesNotExist:
                return Response({"category_id": ["Does not exist"]}, status=400)
            except Exception:
                return Response({"category_id": ["Invalid ID"]}, status=400)

        if image_file:
            filename = default_storage.save(
                f"sub_categories/{image_file.name}", image_file
            )
            sub.image = f"{settings.SITE_URL}{settings.MEDIA_URL}{filename}"

        # optional fields
        if "language" in request.data:
            sub.language = request.data.getlist("language")

        if "duration" in request.data:
            sub.duration = request.data.get("duration")

        if "mode" in request.data:
            sub.mode = request.data.getlist("mode")

        if "offer_label" in request.data:
            sub.offer_label = request.data.get("offer_label")
        # ✅ PRICE UPDATE
        if "price" in request.data:
            try:
                sub.price = float(request.data.get("price"))
            except ValueError:
                return Response({"price": ["Invalid value"]}, status=400)

        if "offer_percentage" in request.data:
            try:
                sub.offer_percentage = int(request.data.get("offer_percentage"))
            except ValueError:
                return Response({"offer_percentage": ["Invalid value"]}, status=400)

        if "is_free" in request.data:
            sub.is_free = str(request.data.get("is_free")).lower() in ["true", "1", "yes"]

        sub.save()

        return Response(
            {
                "id": str(sub.id),
                "name": sub.name,
                "image": sub.image,
            },
            status=status.HTTP_200_OK,
        )

    # 🗑️ DELETE (SAFE)
    def delete(self, request, sub_category_id):
        try:
            sub = SubCategory.objects.get(id=ObjectId(sub_category_id))
        except SubCategory.DoesNotExist:
            return Response(
                {"error": "SubCategory not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:
            return Response(
                {"error": "Invalid sub_category id"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 🚫 DO NOT DELETE IF COURSES EXIST
        if Course.objects.filter(sub_category=sub).count() > 0:
            return Response(
                {
                    "error": "Cannot delete sub category. Courses exist under it."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        sub.delete()

        return Response(
            {"message": "SubCategory deleted successfully"},
            status=status.HTTP_200_OK,
        )

class PublicSubCategoryListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        category_id = request.query_params.get("category_id")

        sub_categories = SubCategory.objects.order_by("-created_at")

        # 🔹 Filter by category (client flow)
        if category_id:
            try:
                sub_categories = sub_categories.filter(
                    category=ObjectId(category_id)
                )
            except Exception:
                return Response(
                    {"error": "Invalid category_id"},
                    status=400
                )

        return Response(
            [
                {
                    "id": str(s.id),
                    "name": s.name,
                    "image": s.image,
                    "category_id": str(s.category.id),
                    "category_name": s.category.name,
                    "mode": s.mode,
                    "duration": s.duration,
                    "offer_label": s.offer_label,
                    "price": s.price,
                    "offer_percentage": s.offer_percentage,
                    "is_free": s.is_free,
                }
                for s in sub_categories
            ]
        )


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from bson import ObjectId
from django.core.files.storage import default_storage
from django.conf import settings

from .models import Course, SubCategory


class CourseListCreateAPIView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    # =========================
    # 🔹 LIST COURSES
    # =========================
    def get(self, request):
        sub_category_id = request.query_params.get("sub_category_id")

        try:
            if sub_category_id:
                sub_category = SubCategory.objects.get(id=ObjectId(sub_category_id))
                courses = Course.objects.filter(sub_category=sub_category)
            else:
                courses = Course.objects.all()
        except Exception:
            return Response(
                {"error": "Invalid sub_category_id"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = []

        for c in courses:
            category_data = None
            sub_category_data = None

            try:
                if c.sub_category:
                    sub_category_data = {
                        "id": str(c.sub_category.id),
                        "name": c.sub_category.name,
                        "price": c.sub_category.price,
                        "offer_percentage": c.sub_category.offer_percentage,
                        "is_free": c.sub_category.is_free,
                    }

                    if c.sub_category.category:
                        category_data = {
                            "id": str(c.sub_category.category.id),
                            "name": c.sub_category.category.name,
                        }
            except Exception:
                pass

            data.append(
                {
                    "id": str(c.id),
                    "title": c.title,
                    "description": c.description,
                    "mode": c.mode,
                    "duration": c.duration,
                    "language": c.language,
                    "modules": c.modules,
                    "image_url": c.image_url,
                    "category": category_data,
                    "sub_category": sub_category_data,
                }
            )

        return Response(data, status=status.HTTP_200_OK)

    # =========================
    # 🔹 CREATE COURSE
    # =========================
    def post(self, request):
        sub_category_id = request.data.get("sub_category")
        if not sub_category_id:
            return Response(
                {"sub_category": ["Required"]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            sub_category = SubCategory.objects.get(id=ObjectId(sub_category_id))
        except Exception:
            return Response(
                {"sub_category": ["Invalid ID"]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 🚫 ONE COURSE PER SUB CATEGORY
        if Course.objects.filter(sub_category=sub_category).first():
            return Response(
                {"sub_category": ["Only one course is allowed per sub category"]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        title = request.data.get("title", "").strip()
        duration = request.data.get("duration")

        if not title:
            return Response({"title": ["Required"]}, status=400)

        if not duration:
            return Response({"duration": ["Required"]}, status=400)

        mode = request.data.getlist("mode")
        if not mode:
            return Response({"mode": ["Select at least one"]}, status=400)

        language = request.data.getlist("language")
        modules = request.data.getlist("modules[]")

        image_file = request.FILES.get("image")
        image_url = None

        if image_file:
            filename = default_storage.save(f"courses/{image_file.name}", image_file)
            image_url = f"{settings.SITE_URL}{settings.MEDIA_URL}{filename}"

        course = Course(
            sub_category=sub_category,
            title=title,
            description=request.data.get("description"),
            language=language,
            duration=duration,
            mode=[m.capitalize() for m in mode],
            modules=modules,
            image_url=image_url,
        )

        course.save()

        return Response(
            {"id": str(course.id)},
            status=status.HTTP_201_CREATED,
        )


class CourseDetailAPIView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self, pk):
        try:
            return Course.objects.get(id=ObjectId(pk))
        except Exception:
            raise Http404

    def get(self, request, pk):
        c = self.get_object(pk)

        category_name = None
        sub_category_data = None

        try:
            if c.sub_category:
                sub_category_data = {
                    "id": str(c.sub_category.id),
                    "name": c.sub_category.name,
                    "price": c.sub_category.price,
                    "offer_percentage": c.sub_category.offer_percentage,
                    "is_free": c.sub_category.is_free,
                }

                if c.sub_category.category:
                    category_name = c.sub_category.category.name
        except Exception:
            pass  # broken DBRef protection

        return Response(
            {
                "id": str(c.id),
                "title": c.title,
                "description": c.description,
                "category": category_name,
                "sub_category": sub_category_data,
                "mode": c.mode,
                "duration": c.duration,
                "language": c.language,
                "modules": c.modules,
                "image_url": c.image_url,
                "enrolled_status": c.enrolled_status,
            }
        )

    def put(self, request, pk):
        c = self.get_object(pk)

        # SAFE sub_category update
        sub_category_id = request.data.get("sub_category_id")
        if sub_category_id:
            try:
                sub_category = SubCategory.objects.get(id=ObjectId(sub_category_id))

                if Course.objects.filter(sub_category=sub_category).exclude(id=c.id).exists():
                    return Response(
                        {"sub_category": ["This sub category already has a course"]},
                        status=400,
                    )

                c.sub_category = sub_category

            except SubCategory.DoesNotExist:
                return Response({"sub_category": ["Does not exist"]}, status=400)
            except Exception:
                return Response({"sub_category": ["Invalid ID"]}, status=400)

        # ✅ COURSE FIELDS ONLY
        c.title = request.data.get("title", c.title)
        c.description = request.data.get("description", c.description)
        c.language = request.data.getlist("language") or c.language
        c.duration = request.data.get("duration", c.duration)
        c.mode = request.data.getlist("mode") or c.mode
        c.modules = request.data.getlist("modules") or c.modules

        if request.FILES.get("image"):
            filename = default_storage.save(
                f"courses/{request.FILES['image'].name}",
                request.FILES["image"],
            )
            c.image_url = f"{settings.SITE_URL}{settings.MEDIA_URL}{filename}"

        c.save()
        return Response({"id": str(c.id)})

    def delete(self, request, pk):
        self.get_object(pk).delete()
        return Response(status=204)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):
    course = Course.objects(id=request.data.get("course_id")).first()
    if not course:
        return Response({"error": "Course not found"}, status=404)

    order = client.order.create(
        {"amount": int(course.price * 100), "currency": "INR", "payment_capture": 1}
    )

    Payment.objects.create(
        user=str(request.user.id),
        course_id=str(course.id),
        razorpay_order_id=order["id"],
        amount=course.price,
        status="pending",
    )

    return Response(order)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def confirm_payment(request):
    payment = Payment.objects.filter(
        razorpay_order_id=request.data.get("razorpay_order_id"), user=str(request.user.id)
    ).first()

    if not payment:
        return Response({"error": "Payment not found"}, status=404)

    payment.status = "paid"
    payment.save()

    course = Course.objects.get(id=payment.course_id)

    EnrolledCourse.objects.get_or_create(
        user=request.user,
        course=course,
        payment_id=payment.razorpay_order_id,
    )

    return Response({"success": True})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_courses(request):
    enrolled = EnrolledCourse.objects.filter(user=request.user)
    return Response(
        [
            {
                "id": str(e.course.id),
                "title": e.course.title,
                "progress": e.progress,
                "status": e.status,
            }
            for e in enrolled
        ]
    )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_course_status(request, course_id):
    try:
        enrolled = EnrolledCourse.objects(id=ObjectId(course_id)).first()
        if not enrolled:
            return Response(
                {"error": "Enrollment not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        new_status = request.data.get("status")

        allowed_statuses = ["Not Started", "In Progress", "Completed"]
        if new_status not in allowed_statuses:
            return Response(
                {"error": "Invalid status value"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 🔁 RESET LOGIC (only once)
        if new_status == "Not Started":
            if enrolled.reset_locked:
                return Response(
                    {"error": "This course has already been reset once"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            enrolled.progress = 0
            enrolled.status = "Not Started"
            enrolled.reset_locked = True

        elif new_status == "In Progress":
            enrolled.status = "In Progress"
            if enrolled.progress == 0:
                enrolled.progress = 10
            enrolled.reset_locked = False

        elif new_status == "Completed":
            enrolled.status = "Completed"
            enrolled.progress = 100

        enrolled.save()

        return Response(
            {
                "success": True,
                "course_id": str(enrolled.id),
                "status": enrolled.status,
                "progress": enrolled.progress,
                "reset_locked": enrolled.reset_locked,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
