# academy_backend/courses/authentication.py
import jwt
from django.conf import settings
from rest_framework import authentication, exceptions
from users.models import User  # 👈 adjust if your model is elsewhere

class CustomJWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = authentication.get_authorization_header(request)

        if not auth_header:
            return None

        try:
            prefix, token = auth_header.decode().split(" ")
        except ValueError:
            raise exceptions.AuthenticationFailed("Invalid authorization header format")

        if prefix.lower() != "bearer":
            return None

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed("Token has expired")
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed("Invalid token")

        try:
            user = User.objects.get(id=payload.get("user_id"))
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed("User not found")

        return (user, None)
