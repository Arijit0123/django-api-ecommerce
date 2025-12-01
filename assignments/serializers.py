from rest_framework import serializers
from assignments.models import Assignment, Submission

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        field = '__all__'
        read_only_fields = ['student', 'submitted_at']