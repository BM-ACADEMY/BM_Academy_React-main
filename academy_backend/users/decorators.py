# users/decorators.py
from functools import wraps
from django.http import JsonResponse
from .utils import decode_jwt
from .models import User

def jwt_required(view_func):
    @wraps(view_func)
    def wrapped(request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JsonResponse({"error": "Authorization header missing"}, status=401)
        
        token = auth_header.split(" ")[1]
        payload = decode_jwt(token)
        if not payload:
            return JsonResponse({"error": "Invalid or expired token"}, status=401)

        request.user = User.objects(id=payload["user_id"]).first()
        return view_func(request, *args, **kwargs)
    return wrapped
