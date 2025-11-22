from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CertificateViewSet, verify_certificate  # import new function
from .views import download_certificate


router = DefaultRouter()
router.register(r'certificates', CertificateViewSet, basename='certificate')

urlpatterns = [
    path('', include(router.urls)),
    path('certificates/verify/<str:certificate_id>/', verify_certificate),  # ✅ add this
     path("certificates/download/<str:certificate_id>/", download_certificate),
]
