from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.views import RegisterView, ProfileView, UserListView, ChangePasswordView,PasswordResetRequestView,PasswordResetView

urlpatterns = [
    # Registration and auth
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Profile
    path('profile/', ProfileView.as_view(), name='profile'),

    # List all users (optional)
    path('users/', UserListView.as_view(), name='user-list'),

    #Password Reset
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('reset-password/', PasswordResetRequestView.as_view(), name='reset-password'),
    path('reset-password/<uid>/<token>/', PasswordResetView.as_view(), name='reset-password-confirm'),
]
