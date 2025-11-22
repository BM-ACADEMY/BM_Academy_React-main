# certificates/permissions.py
from rest_framework.permissions import BasePermission

class IsMongoAdmin(BasePermission):
    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        return bool(user and getattr(user, "role", None) == "admin")
