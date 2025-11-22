from django.db import models

# Create your models here.
# contact/models.py
from mongoengine import Document, StringField, DateTimeField
from datetime import datetime

class ContactMessage(Document):
    name = StringField(required=True)
    email = StringField(required=True)
    subject = StringField()
    message = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)


    def __str__(self):
        return f"{self.name} - {self.subject or 'No subject'}"
