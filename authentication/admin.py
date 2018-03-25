from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from import_export.resources import ModelResource
from django.contrib.auth.models import Group
from django.utils.translation import ugettext_lazy as _
from django.contrib.admin.actions import delete_selected as delete_selected_

from .models import MyUser
from state.models import Profile

class MyUserResource(ModelResource):
    class Meta:
        model = MyUser
        fields = ('id', 'email', 'gender', 'age', 'country', 'date_joined', 'is_staff' )
        export_order = ('id', 'email', 'gender', 'age', 'country', 'date_joined', 'is_staff' )

def delete_selected(modeladmin, request, queryset):
    for obj in queryset:
        email = obj.email
    if not modeladmin.has_delete_permission(request):
        raise PermissionDenied
    if request.POST.get('post'):
        for obj in queryset:
            obj.delete()
    else:
        Profile.objects.get(email=email).delete()
        return delete_selected_(modeladmin, request, queryset)
delete_selected.short_description = "Delete selected users"

@admin.register(MyUser)
class UserAdmin(ImportExportModelAdmin):

    resource_class = MyUserResource

    fieldsets = (
        (None, {'fields': ('email', 'password', 'gender', 'age', 'country')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        (_('Important dates'), {'fields': ('date_joined',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'gender'),
        }),
    )
    list_display = ('email', 'is_staff', 'date_joined')
    readonly_fields = ('email', 'password','gender', 'age', 'country','date_joined')
    search_fields = ('email',)
    ordering = ('email',)
    actions = [delete_selected]

    def has_add_permission(self, request):
        return False


admin.site.unregister(Group)
