from rest_framework import serializers
from events.models import Event, Comment

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'description',
            'date',
            'location',
            'created_by',
            'created_at',
        ]
        read_only_fields = ['created_by', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        # read_only_fields = ['student', 'submitted_at']