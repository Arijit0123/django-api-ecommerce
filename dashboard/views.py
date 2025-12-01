from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from courses.models import Course
from assignments.models import Assignment, Submission
from events.models import Event
# Create your views here.

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role =='student':
            courses = user.student_enrolled.all()
            assignments = Assignment.objects.filter(course__in=courses)
            submissions = Submission.objects.filter(student = user)
            events = Event.objects.all()

            return Response({
                'role' : 'student',
                'courses_taught' : courses.count(),
                'assignment_created' : assignments.count(),
                'submissions_received' : submissions.count(),
                'events_created' : events.count()
            })
        elif user.role == 'teacher':
            courses = Course.objects.filter(instructor = user)
            assignments = Assignment.objects.filter(created_by = user)
            submissions = Submission.objects.filter(assignment__created_by = user)
            events = Event.objects.filter(created_by = user)

            return Response({
                'role' : 'teacher',
                'courses_taught' : courses.count(),
                'assignment_created' : assignments.count(),
                'submissions_received' : submissions.count(),
                'events_created' : events.count()
            })
        elif user.role == 'admin':
            return Response({
                'role': 'admin',
                'total_users': user.__class__.objects.count(),
                'total_courses': Course.objects.count(),
                'total_assignments': Assignment.objects.count(),
                'total_events': Event.objects.count()
                })
        else:
            raise PermissionDenied("Invalid Role.")