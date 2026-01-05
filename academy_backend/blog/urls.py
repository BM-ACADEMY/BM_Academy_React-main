from django.urls import path
from .views import (
    BlogListView,
    BlogDetailView,
    BlogAdminListCreateView,
    BlogAdminRetrieveUpdateDeleteView,
)

urlpatterns = [
    # 🔐 ADMIN (must be BEFORE slug route)
    path("admin/", BlogAdminListCreateView.as_view(), name="blog-admin-list-create"),
    path("admin/<int:pk>/", BlogAdminRetrieveUpdateDeleteView.as_view(), name="blog-admin-detail"),
    # 🌍 PUBLIC
    path("", BlogListView.as_view(), name="blog-list"),
    path("<slug:slug>/", BlogDetailView.as_view(), name="blog-detail"),
]
