from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from .models import User
from .serializers import UserLoginSerializer
from .utils import create_jwt  # function to create JWT
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import jwt
import datetime
import json

# JWT secret
JWT_SECRET = "72e55c024d5279e91a73db4df975f81bb6cd98c4d782087c60f50d510c0f114f"
CLIENT_ID = "281995264661-p0jsb5s26huk2auv0krl7nc28e3jmk26.apps.googleusercontent.com"


def generate_jwt(user):
    payload = {
        "user_id": str(user.id),
        "email": user.email,
        "role": user.role,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7),
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
    return token


# ----------------- User Signup -----------------
@csrf_exempt
def signup_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    data = json.loads(request.body)
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")

    if not name or not email or not password or not phone:
        return JsonResponse({"error": "Name, email, phone, and password are required"}, status=400)

    if User.objects(email=email).first():
        return JsonResponse({"error": "Email already registered"}, status=400)

    user = User(name=name, email=email, phone=phone)
    user.set_password(password)
    user.role = "client"
    user.save()

    return JsonResponse({"message": "Signup successful"})


# ----------------- User / Admin Login -----------------
@csrf_exempt
def login_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "client")  # optional: "admin" or "client"

    user = User.objects(email=email, role=role).first()
    if not user or not user.check_password(password):
        return JsonResponse({"error": "Invalid credentials"}, status=401)

    token = generate_jwt(user)
    return JsonResponse({
        "token": token,
        "user": {
            "email": user.email,
            "role": user.role
        }
    })


# ----------------- Google Login -----------------
from django.conf import settings
import secrets

@csrf_exempt
def google_login_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST method required"}, status=400)

    try:
        body = json.loads(request.body)
        token = body.get("token")
        if not token:
            return JsonResponse({"error": "Token missing"}, status=400)

        # Verify token with Google
        idinfo = id_token.verify_oauth2_token(
            token, google_requests.Request(), settings.GOOGLE_CLIENT_ID
        )

        email = idinfo.get("email")
        name = idinfo.get("name", "Unknown")
        if not email:
            return JsonResponse({"error": "Email not found in token"}, status=400)

        # Get or create user
        user = User.objects(email=email).first()
        if not user:
            user = User(
                email=email,
                name=name,
                role="client",
                phone="0000000000"
            )
            import secrets
            user.set_password(secrets.token_urlsafe(16))  # random password
            user.save()

        jwt_token = generate_jwt(user)
        return JsonResponse({
            "access": jwt_token,
            "user": {"email": user.email, "name": user.name, "role": user.role}
        })

    except ValueError as e:
        return JsonResponse({"error": f"Invalid Google token: {str(e)}"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ----------------- Profile -----------------
from .decorators import jwt_required

@jwt_required
def profile_api(request):
    user = request.user
    return JsonResponse({"email": user.email, "role": user.role})


# views.py
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from .models import User  # MongoEngine User
from .utils import create_jwt
import json

class AdminLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            if not email or not password:
                return JsonResponse({"error": "Email and password required"}, status=400)

            user = User.objects(email=email, role="admin").first()
            if not user or not user.check_password(password):
                return JsonResponse({"detail": "Invalid credentials"}, status=401)

            access_token = create_jwt(user)

            return JsonResponse({
                "message": "Admin login successful",
                "access": access_token,
                "admin": {
                    "email": user.email,
                    "role": user.role,
                    "name": getattr(user, "name", "")
                }
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

from django.http import JsonResponse
from users.models import User as MongoUser
from courses.models import EnrolledCourse


# ✅ 1️⃣ Basic User List (for /api/users/list/)
def list_users(request):
    if request.method == "GET":
        try:
            users = MongoUser.objects.all()
            users_list = [
                {
                    "id": str(user.id),
                    "name": getattr(user, "name", ""),
                    "email": getattr(user, "email", ""),
                    "phone": getattr(user, "phone", ""),
                }
                for user in users
            ]
            return JsonResponse(users_list, safe=False)
        except Exception as e:
            print("❌ ERROR in list_users:", e)
            return JsonResponse({"error": str(e)}, status=500)



# ✅ 2️⃣ User List with Enrolled Courses (for /api/users/list-with-courses/)
from django.http import JsonResponse
from users.models import User as MongoUser
from courses.models import EnrolledCourse

def list_users_with_courses(request):
    if request.method == "GET":
        try:
            users_data = []
            users = MongoUser.objects.all()

            for user in users:
                enrolled_courses = EnrolledCourse.objects(user=user)
                courses_list = []

                for e in enrolled_courses:
                    # ✅ Validate referenced course
                    try:
                        course = e.course
                        if not course:
                            continue
                    except Exception as err:
                        print(f"⚠️ Skipping broken course ref for user {user.id}: {err}")
                        continue

                    # ✅ Include EnrolledCourse ID instead of just Course ID
                    courses_list.append({
                        "id": str(e.id),  # ✅ EnrolledCourse ID — required for update-status
                        "course_id": str(course.id),  # optional (original course reference)
                        "title": getattr(course, "title", ""),
                        "enrolled_at": e.enrolled_at.isoformat() if e.enrolled_at else None,
                        "price": getattr(course, "price", 0),
                        "progress": getattr(e, "progress", 0),
                        "status": getattr(e, "status", "Not Started"),
                    })

                users_data.append({
                    "id": str(user.id),
                    "name": getattr(user, "name", ""),
                    "email": getattr(user, "email", ""),
                    "phone": getattr(user, "phone", ""),
                    "enrolled_courses": courses_list,
                })

            return JsonResponse(users_data, safe=False)

        except Exception as e:
            print("❌ ERROR in list_users_with_courses:", e)
            return JsonResponse({"error": str(e)}, status=500)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from .models import User  # <-- MongoEngine User model

@method_decorator(csrf_exempt, name='dispatch')
class CreateTempAdminView(View):
    def post(self, request):
        import json
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return JsonResponse({"error": "Email and password required"}, status=400)

        if User.objects(email=email, role="admin").first():
            return JsonResponse({"error": "Admin already exists"}, status=400)

        # Create admin in MongoEngine
        user = User(email=email, role="admin", name="Temp Admin", phone="0000000000")
        user.set_password(password)
        user.save()

        return JsonResponse({"status": "Admin created successfully"})
