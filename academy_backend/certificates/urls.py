from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CertificateViewSet, verify_certificate, download_certificate

router = DefaultRouter()
router.register(r"certificates", CertificateViewSet, basename="certificate")

urlpatterns = [
    path("", include(router.urls)),
    # Verify certificate
    path("certificates/verify/<str:certificate_id>/", verify_certificate),
    # Download certificate
    path("certificates/download/<str:certificate_id>/", download_certificate),
]
