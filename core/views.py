from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from core.models import User
from core.serializers import RegisterSerializer, UserSerializer, ChangePasswordSerializer,PasswordResetRequestSerializer,ResetPasswordSerializer
from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth import get_user_model,update_session_auth_hash

# Create your views here.

User = get_user_model()
token_generator = PasswordResetTokenGenerator()

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

class ChangePasswordView(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if not user.check_password(serializer.validated_data['old_password']):
            raise ValidationError({"old_password": "Incorrect password"})

        user.set_password(serializer.validated_data['new_password'])
        user.save()
        update_session_auth_hash(request, user)

        return Response({"message": "Password changed successfully"})

     
class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'If email exists, a reset link was sent.'})

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)

        reset_link = f"http://localhost:8000/api/core/reset-password/{uid}/{token}/"

        send_mail(
            "Password Reset",
            f"Click this link to reset your password:\n{reset_link}",
            "noreply@campusconnect.com",
            [email],
            fail_silently=False,
        )

        return Response({"message": "Password reset email sent"})


class PasswordResetView(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer

    def post(self, request, uid, token):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)
        except (User.DoesNotExist, ValueError, OverflowError):
            return Response({'error': 'Invalid reset link'}, status=400)

        if not token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token"}, status=400)

        user.set_password(serializer.validated_data['new_password'])
        user.save()

        return Response({"message": "Password reset successful"})
