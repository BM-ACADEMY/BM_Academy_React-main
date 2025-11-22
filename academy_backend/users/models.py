# users/models.py
from mongoengine import Document, StringField
from werkzeug.security import generate_password_hash, check_password_hash

class User(Document):
    name = StringField(required=True)
    email = StringField(required=True, unique=True)
    phone = StringField(required=True)
    password_hash = StringField(required=True)
    role = StringField(choices=["admin", "client", "student"], default="client")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    # Add these for Django/DRF compatibility
    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    @property
    def is_active(self):
        return True
