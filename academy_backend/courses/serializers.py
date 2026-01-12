from rest_framework import serializers
from .models import Category, SubCategory, Course
from bson import ObjectId


# -------------------- CATEGORY --------------------
class CategorySerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    image = serializers.CharField(required=False, allow_null=True)
    created_at = serializers.DateTimeField(read_only=True)


# -------------------- SUB CATEGORY --------------------
class SubCategorySerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)

    category_id = serializers.CharField(write_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    name = serializers.CharField()
    image = serializers.CharField(required=False, allow_null=True)
    language = serializers.ListField(child=serializers.CharField())
    duration = serializers.CharField()
    mode = serializers.ListField(child=serializers.CharField())
    offer_label = serializers.CharField(required=False, allow_null=True)

    created_at = serializers.DateTimeField(read_only=True)

    def validate_category_id(self, value):
        try:
            return Category.objects.get(pk=ObjectId(value))
        except Exception:
            raise serializers.ValidationError("Invalid category ID")

    def create(self, validated_data):
        category = validated_data.pop("category_id")
        return SubCategory.objects.create(category=category, **validated_data)


# -------------------- COURSE --------------------

class CourseSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)

    sub_category = serializers.CharField()
    title = serializers.CharField()
    description = serializers.CharField(required=False)
    language = serializers.ListField(child=serializers.CharField())
    duration = serializers.CharField()
    mode = serializers.ListField(child=serializers.CharField())
    modules = serializers.ListField(child=serializers.CharField(), required=False)
    image_url = serializers.CharField(required=False)

    def validate_sub_category(self, value):
        try:
            return SubCategory.objects.get(pk=ObjectId(value))
        except Exception:
            raise serializers.ValidationError("Invalid sub_category ID")

    def create(self, validated_data):
        sub_category = validated_data.pop("sub_category")
        course = Course.objects.create(
            sub_category=sub_category,
            **validated_data
        )
        return course
