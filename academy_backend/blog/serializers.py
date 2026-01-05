from rest_framework import serializers
from .models import BlogPost


class BlogListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "thumbnail",
            "author",
            "created_at",
        ]


class BlogDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = "__all__"
