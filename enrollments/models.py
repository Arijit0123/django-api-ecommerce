from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Course
# Create your models here.

User = get_user_model()

class Enrollment(models.Model):
    STATUS_CHOICES = (
        ("pending","Pending"),
        ("approved","Approved"),
        ("rejected","Rejected")
    )
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="enrollments")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrollments") 
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("student","course") # student cannot enroll twice

    def __str__(self):
        return f"{self.student.username} → {self.course.title} ({self.status})"