# contact/apps.py
from django.apps import AppConfig
from mongoengine import connect
from django.conf import settings

class ContactConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "contact"

    def ready(self):
        try:
            from mongoengine import connect
            import os
            mongo_uri = os.getenv("MONGO_ATLAS_URI") or os.getenv("MONGO_LOCAL_URI")
            if mongo_uri:
                connect(host=mongo_uri)
                print(" MongoDB connected successfully in app startup")
            else:
                print(" No MongoDB URI found in environment")
        except Exception as e:
            print("MongoDB connection failed:", e)
