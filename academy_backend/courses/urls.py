from django.urls import path

from .views import (
    # Banners
    # Category
    CategoryListCreateAPIView,
    CategoryDetailAPIView,
    PublicCategoryListAPIView,
    # SubCategory
    SubCategoryListCreateAPIView,
    SubCategoryDetailAPIView,
    PublicSubCategoryListAPIView,
    # Courses
    CourseListCreateAPIView,
    CourseDetailAPIView,
    # Payments & Enrollment
    create_order,
    confirm_payment,
    my_courses,
    # Admin progress update
    update_course_status,
)

urlpatterns = [
    # ------------------ Banner ------------------
    # ------------------ Category ------------------
    path("categories/", CategoryListCreateAPIView.as_view(), name="category-list-create"),
    path("categories/<str:category_id>/", CategoryDetailAPIView.as_view()),
    path("public/categories/", PublicCategoryListAPIView.as_view()),
    # ------------------ SubCategory ------------------
    path("sub-categories/", SubCategoryListCreateAPIView.as_view()),
    path("sub-categories/<str:sub_category_id>/", SubCategoryDetailAPIView.as_view()),
    path("public/sub-categories/", PublicSubCategoryListAPIView.as_view()),
    # ------------------ Courses ------------------
    path("courses/", CourseListCreateAPIView.as_view(), name="course-list-create"),
    path("courses/<str:pk>/", CourseDetailAPIView.as_view(), name="course-detail"),
    # ------------------ Payments ------------------
    path("payments/create-order/", create_order, name="create-order"),
    path("payments/confirm/", confirm_payment, name="confirm-payment"),
    # ------------------ Enrollment ------------------
    path("my-courses/", my_courses, name="my-courses"),
    # ------------------ Admin / Progress ------------------
    path(
        "enrollments/<str:course_id>/status/",
        update_course_status,
        name="update-course-status",
    ),
]
