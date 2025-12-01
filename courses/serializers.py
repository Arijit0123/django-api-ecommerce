from rest_framework import serializers
from courses.models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        read_only_fields = ['instructor']
        extra_kwargs = {
            'students': {'required': False}  # 👈 This makes it optional
        }