# certificates/models.py
from mongoengine import Document, StringField, DateTimeField
import datetime

class Certificate(Document):
    user_id = StringField(required=True)  # MongoDB ObjectId as string
    course_id = StringField(required=True)  # MongoDB ObjectId as string
    certificate_id = StringField(required=True, unique=True)
    issue_date = DateTimeField(default=datetime.datetime.utcnow)
    file_url = StringField()  # store PDF file URL (instead of FileField)

    meta = {"collection": "certificates"}  # ensures MongoDB stores in this collection
