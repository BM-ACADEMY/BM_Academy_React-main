from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()  # for frontend
    title = serializers.CharField()
    description = serializers.CharField()
    mode = serializers.CharField()
    duration = serializers.CharField()
    price = serializers.FloatField()
    enrolled_status = serializers.CharField()
    modules = serializers.ListField(child=serializers.CharField(), default=list)
    image_url = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(read_only=True)

    def get_id(self, obj):
        return str(obj.id)  # Convert ObjectId to string

    def get_image_url(self, obj):
        if hasattr(obj, 'image') and obj.image:
            return obj.image.url
        return None
