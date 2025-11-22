# certificates/authentication.py
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from users.models import User
import jwt
from django.conf import settings
from bson import ObjectId

class MongoJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get("Authorization")  # "Bearer <token>"
        if not token:
            return None
        
        try:
            token = token.split(" ")[1]  # remove "Bearer "
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = payload.get("user_id")
            if not user_id:
                raise AuthenticationFailed("Invalid token payload")
            
            user = User.objects.get(id=ObjectId(user_id))
            return (user, None)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expired")
        except Exception as e:
            raise AuthenticationFailed(f"Invalid token: {str(e)}")
