from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from typing import cast

from enrollments.models import Enrollment
from enrollments.serializers import EnrollmentSerializer
from enrollments.utils import send_enrollment_email
from courses.models import Course
from core.models import User


class EnrollmentRequestView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = cast(User, self.request.user)

        # Only students can request
        if user.role != "student":
            raise PermissionDenied("Only students can request enrollment.")

        serializer.save(student=user, status="pending")

        # Email notification
        send_enrollment_email(
            "Enrollment Request Received",
            f"Your request to enroll in a course is pending approval.",
            user.email
        )


class MyEnrollmentView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(student=self.request.user)


class CourseEnrollmentListView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = cast(User, self.request.user)
        course_id = self.kwargs['course_id']
        course = get_object_or_404(Course, id=course_id)

        # Teacher can only view students for THEIR courses
        if user.role == "teacher" and course.instructor != user:
            raise PermissionDenied("You can only view enrollments for your own courses.")

        # Admin bypass allowed
        return Enrollment.objects.filter(course=course)


class ApproveEnrollmentView(generics.UpdateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        user = cast(User, self.request.user)
        enrollment = self.get_object()

        # Teacher permission check
        if user.role == "teacher" and enrollment.course.instructor != user:
            raise PermissionDenied("You cannot approve enrollments for other teachers' courses.")

        serializer.save(status="approved")

        # Email
        send_enrollment_email(
            "Enrollment Approved",
            f"Congratulations! You have been approved for {enrollment.course.title}.",
            enrollment.student.email
        )


class RejectEnrollmentView(generics.UpdateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        user = cast(User, self.request.user)
        enrollment = self.get_object()

        # Teacher permission check
        if user.role == "teacher" and enrollment.course.instructor != user:
            raise PermissionDenied("You cannot approve/reject enrollments for other teachers' courses.")

        serializer.save(status="rejected")

        # Email
        send_enrollment_email(
            "Enrollment Rejected",
            f"Your enrollment request for {enrollment.course.title} has been rejected.",
            enrollment.student.email
        )
