from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from core.models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'role', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (('Additional Info', {'fields': ('role', 'bio', 'profile_picture')}),) # type: ignore