from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [
    # Courses API
    path('api/', include('courses.urls')),

    # Users API (signup, login, google-login, profile, admin login)
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/', include('certificates.urls')),

]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
