"""Integrate with admin module."""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.contrib.auth.models import Group
from django.utils.translation import ugettext_lazy as _

from .models import MyUser


@admin.register(MyUser)
class UserAdmin(DjangoUserAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {'fields': ('email', 'password', 'gender')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        (_('Important dates'), {'fields': ('date_joined',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'gender'),
        }),
    )
    list_display = ('email', 'is_staff')
    readonly_fields = ('email','gender')
    search_fields = ('email',)
    ordering = ('email',)


admin.site.unregister(Group)
