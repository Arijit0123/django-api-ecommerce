from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Course
# Create your models here.

User = get_user_model()

class Assignment(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name= 'assignments')
    created_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assignments_created')
    due_date = models.DateTimeField()

    def __str__(self):
       return f"{self.title} ({self.course.title})"
    
class Submission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submisssions')
    student = models.ForeignKey(User, on_delete= models.CASCADE, related_name='submissions')
    file = models.FileField(upload_to='submissions/')
    submitted_at = models.DateTimeField(auto_now=True)
    grade = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    feedback = models.TextField(blank=True,null=True)

    def __str__(self):
       return f"Submission by {self.student.username} for {self.assignment.title}"