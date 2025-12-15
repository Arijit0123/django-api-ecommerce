from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from rest_framework.exceptions import PermissionDenied
from rest_framework import generics, permissions
from rest_framework.response import Response
from events.models import Event, Comment
from events.serializers import EventSerializer, CommentSerializer
from typing import cast

User = get_user_model()

class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = cast(AbstractUser, self.request.user)

        if getattr(user, "role", None) not in ["admin", "teacher"]:
            raise PermissionDenied("Only teachers and admins can create events.")

        serializer.save(created_by=user)

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
