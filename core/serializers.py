from rest_framework import serializers
from core.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'bio', 'profile_picture']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']

    def create(self, validated_data):
        role = validated_data.get('role')
        
        # If the role is admin, automatically set is_staff to True
        is_staff = True if role == 'admin' else False
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=role,
            is_staff=is_staff  # Automatically set is_staff for admins
        )

        if role=="admin":
            user.is_staff = True
            user.is_superuser= True
            user.save()
        
        return user