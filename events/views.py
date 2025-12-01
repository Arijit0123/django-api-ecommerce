from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied
from rest_framework import generics, permissions
from events.models import Event, Comment
from events.serializers import EventSerializer, CommentSerializer

User = get_user_model()

class EventCreateView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role not in ['admin', 'teacher']:  # type: ignore
            raise PermissionDenied("Only teachers and admin can create events.")
        serializer.save(created_by=self.request.user)

class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        event_id = self.kwargs['event_id']
        return Comment.objects.filter(event_id=event_id)

class CommentDeleteView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        user = self.request.user
        if instance.user != user and user.role != 'admin':  # type: ignore
            raise PermissionDenied("You can only delete your own comment.")
        instance.delete()
