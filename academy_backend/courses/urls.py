from django.urls import path, include
from .views import CourseListCreateAPIView, CourseRetrieveUpdateDeleteView, CourseDetailAPIView, BannerListAPIView
from .views import create_order, confirm_payment
from . import views
from django.urls import path
from courses import views

urlpatterns = [
    path('courses/', CourseListCreateAPIView.as_view(), name='api-course-list-create'),  # list endpoint
    path('courses/<str:pk>/', CourseDetailAPIView.as_view(), name='api-course-detail'),  
    path('banners/', BannerListAPIView.as_view(), name='banner-list'),
    path("api/auth/", include("users.urls")),

    # FIXED ROUTES
    # courses/urls.py
    path('courses/create_order/', create_order, name='create_order'),
    path('courses/confirm_payment/', confirm_payment, name='confirm_payment'),
    path('enroll-course/', views.enroll_course, name='enroll_course'),
    path('my-courses/', views.my_courses, name='my_courses'),
     # ✅ FIX: Add "courses/" prefix
    path('courses/<str:course_id>/update-status/', views.update_course_status, name='update_course_status'),
]








