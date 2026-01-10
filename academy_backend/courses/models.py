import datetime
from mongoengine import (
    Document,
    StringField,
    ReferenceField,
    ListField,
    FloatField,
    DateTimeField,
    IntField,
    BooleanField,
)
from django.db import models


# ======================================================
# CATEGORY
# ======================================================
class Category(Document):
    name = StringField(required=True, max_length=100)
    image = StringField()  # image URL
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {"collection": "categories"}

    def __str__(self):
        return self.name


# ======================================================
# SUB CATEGORY
# ======================================================
class SubCategory(Document):
    category = ReferenceField(Category, required=True)

    name = StringField(required=True, max_length=150)
    image = StringField()

    language = ListField(StringField())
    duration = StringField()  # Short-term / Long-term
    mode = ListField(StringField(choices=["Online", "Offline"]))
    offer_label = StringField()  # e.g. Up to 85% Scholarship

    # ✅ PRICE MOVED FROM COURSE
    price = FloatField(default=0.0)
    offer_percentage = IntField(min_value=0, max_value=100)
    is_free = BooleanField(default=False)

    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {"collection": "sub_categories"}

    def __str__(self):
        return f"{self.category.name} → {self.name}"


# ======================================================
# COURSE (Super-Sub-Category)
# ======================================================
class Course(Document):
    STATUS_CHOICES = ("Open", "Closed", "Coming Soon")

    sub_category = ReferenceField(SubCategory, required=True)

    title = StringField(required=True, max_length=200)
    description = StringField()

    language = ListField(StringField())
    duration = StringField()
    mode = ListField(StringField(choices=["Online", "Offline"]))

    # ❌ REMOVED PRICE FIELDS
    # price
    # offer_percentage

    enrolled_status = StringField(choices=STATUS_CHOICES, default="Open", required=True)

    modules = ListField(StringField())
    image_url = StringField()

    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {"collection": "courses"}

    def __str__(self):
        return self.title


# ======================================================
# PAYMENT (Django SQL – Razorpay)
# ======================================================
class Payment(models.Model):
    user = models.CharField(max_length=100)  # MongoDB User ID as string
    course_id = models.CharField(max_length=100)  # MongoDB Course ID as string

    razorpay_order_id = models.CharField(max_length=100)
    razorpay_payment_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_signature = models.CharField(max_length=100, blank=True, null=True)

    amount = models.FloatField()
    status = models.CharField(
        max_length=10,
        choices=[("pending", "Pending"), ("paid", "Paid"), ("failed", "Failed")],
        default="pending",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.course_id} - {self.status}"


# ======================================================
# ENROLLED COURSE (MongoDB)
# ======================================================
from users.models import User  # MongoEngine User model


class EnrolledCourse(Document):
    user = ReferenceField(User, required=True)
    course = ReferenceField(Course, required=True)

    payment_id = StringField(required=True)
    enrolled_at = DateTimeField(default=datetime.datetime.utcnow)

    progress = IntField(default=0)  # 0–100
    status = StringField(choices=["Not Started", "In Progress", "Completed"], default="Not Started")

    reset_locked = BooleanField(default=False)

    meta = {"collection": "enrolled_courses"}

    def __str__(self):
        return f"{self.user.email} → {self.course.title}"
