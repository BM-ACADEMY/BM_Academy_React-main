from mongoengine import Document, StringField, FloatField, ListField, DateTimeField
import datetime

class Course(Document):
    title = StringField(required=True, max_length=200)
    description = StringField()
    mode = StringField(default="Online")
    duration = StringField(default="Short-term")
    price = FloatField(default=0.0)
    enrolled_status = StringField(default="Open")
    modules = ListField(StringField())
    image_url = StringField()  # store image URL
    created_at = DateTimeField(default=datetime.datetime.now)
    


    meta = {"collection": "courses"}  # <- explicitly set the collection name



from django.db import models

class Payment(models.Model):
    user = models.CharField(max_length=100)  # MongoEngine User ID as string
    course_id = models.CharField(max_length=100)  # MongoEngine Course ID as string
    razorpay_order_id = models.CharField(max_length=100)
    razorpay_payment_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_signature = models.CharField(max_length=100, blank=True, null=True)
    amount = models.FloatField()
    status = models.CharField(
        max_length=10,
        choices=[("pending", "Pending"), ("paid", "Paid"), ("failed", "Failed")],
        default="pending"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    
# courses/models.py
from mongoengine import Document, ReferenceField, StringField, DateTimeField, IntField, BooleanField
from datetime import datetime
from users.models import User
from courses.models import Course

class EnrolledCourse(Document):
    user = ReferenceField(User, required=True)
    course = ReferenceField(Course, required=True)
    payment_id = StringField(required=True)
    enrolled_at = DateTimeField(default=datetime.utcnow)
    progress = IntField(default=0)  # 0-100 percent
    status = StringField(choices=["Not Started", "In Progress", "Completed"], default="Not Started")
    reset_locked = BooleanField(default=False)



    def __str__(self):
        return f"{self.user.email} - {self.course.title}"




