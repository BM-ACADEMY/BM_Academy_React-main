# certificates/models.py
from mongoengine import Document, StringField, DateTimeField
import datetime


class Certificate(Document):
    # Automatic certificate fields
    user_id = StringField()
    course_id = StringField()

    # Manual certificate fields
    manual_name = StringField()
    manual_course = StringField()

    certificate_type = StringField(default="Course")
    certificate_id = StringField(required=True, unique=True)
    issue_date = DateTimeField(default=datetime.datetime.utcnow)

    # Save file path or URL (NOT FileField)
    file_path = StringField()  # e.g., "certificates/CERT12345.pdf"
    file_url = StringField()  # e.g., full absolute URL

    meta = {"collection": "certificates"}
