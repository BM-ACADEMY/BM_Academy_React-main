from rest_framework import generics, permissions
from .models import BlogPost
from .serializers import BlogListSerializer, BlogDetailSerializer


# 🌍 PUBLIC (existing - keep)
class BlogListView(generics.ListAPIView):
    queryset = BlogPost.objects.filter(status="published")
    serializer_class = BlogListSerializer
    permission_classes = [permissions.AllowAny]


class BlogDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.filter(status="published")
    serializer_class = BlogDetailSerializer
    lookup_field = "slug"
    permission_classes = [permissions.AllowAny]


# 🔐 ADMIN (NEW)
class BlogAdminListCreateView(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogDetailSerializer
    permission_classes = [permissions.IsAuthenticated]


class BlogAdminRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
