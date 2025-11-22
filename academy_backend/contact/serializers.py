# contact/serializers.py
from rest_framework import serializers

class ContactMessageSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    email = serializers.EmailField()
    subject = serializers.CharField(max_length=200, allow_blank=True, required=False)
    message = serializers.CharField()
    created_at = serializers.DateTimeField(read_only=True)
