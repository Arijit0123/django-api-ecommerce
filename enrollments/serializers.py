from rest_framework import serializers
from enrollments.models import Enrollment

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment                     
        fields = "__all__"
        read_only_fields = ['student','status', 'enrolled_at']