from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
User = get_user_model()

class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    time = models.DateField()
    location = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete= models.CASCADE, related_name= 'events_created')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title 
    
class Comment(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='event_comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.event.title}"