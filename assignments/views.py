from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied
from rest_framework import generics, permissions
from assignments.models import Assignment, Submission
from assignments.serializers import AssignmentSerializer, SubmissionSerializer

User = get_user_model()

class AssignmentCreateView(generics.CreateAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != 'teacher':  # type: ignore
            raise PermissionDenied("Only teachers can create assignments.")
        serializer.save(created_by=self.request.user)


class AssignmentListView(generics.ListAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]


class AssignmentDetailView(generics.RetrieveAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

class SubmissionCreateView(generics.CreateAPIView):
    queryset = Submission.objects.all()  
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != 'student':  # type: ignore
            raise PermissionDenied("Only students can submit assignments.")
        serializer.save(student=self.request.user)  


class SubmissionListView(generics.ListAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':  # type: ignore
            return Submission.objects.filter(student=user)
        if user.role == 'teacher':  # type: ignore
            return Submission.objects.filter(assignment__created_by=user)
        return Submission.objects.none()


class SubmissionGradeView(generics.UpdateAPIView):
    queryset = Submission.objects.all()  
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        if self.request.user.role != 'teacher':  # type: ignore
            raise PermissionDenied("Only teachers can grade submissions.")
        submission = self.get_object()
        if submission.assignment.created_by != self.request.user:
            raise PermissionDenied("You can only grade your own assignments.")
        serializer.save()
