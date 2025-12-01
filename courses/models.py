from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=255)
    instructor = models.ForeignKey(User, models.CASCADE, related_name="courses_taught")
    students = models.ManyToManyField(User, related_name="students_enrolled")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title