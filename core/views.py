from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny
from core.models import User
from core.serializers import RegisterSerializer, UserSerializer
# Create your views here.

class RegisterView(generics.CreateAPIView):
      queryset = User.objects.all()
      serializer_class = RegisterSerializer
      permission_classes = [AllowAny]

class ProfileView(generics.RetrieveUpdateAPIView):
      queryset = User.objects.all()
      serializer_class = UserSerializer
      permission_classes = [permissions.IsAuthenticated]

      def get_object(self):
        return self.request.user
      
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]