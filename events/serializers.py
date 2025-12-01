from rest_framework import serializers
from events.models import Event, Comment

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        field = '__all__'
        # read_only_fields = ['student', 'submitted_at']