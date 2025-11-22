from django.urls import path
from .views import (
    signup_api,
    login_api,
    google_login_api,
    profile_api,
    AdminLoginAPIView
)
from users import views
from .views import CreateTempAdminView
from .views import list_users, list_users_with_courses


urlpatterns = [
    # Client / User endpoints
    path('signup/', signup_api, name='user-signup'),
    path('login/', login_api, name='user-login'),
    path('google-login/', google_login_api, name='google-login'),
    path('profile/', profile_api, name='profile'),
    path("list/", list_users, name="list_users"),
    path("list-with-courses/", list_users_with_courses, name="list_users_with_courses"),
    # path("list-with-courses/", views.list_users_with_courses, name="list-with-courses"),


    # Admin endpoint
    path('create-temp-admin/', CreateTempAdminView.as_view(), name='create-temp-admin'),
    path("admin/login/", AdminLoginAPIView.as_view(), name="admin-login"),
    ]
