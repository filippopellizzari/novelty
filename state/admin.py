from django.contrib import admin
from .models import *

class ProfileAdmin(admin.ModelAdmin):
    readonly_fields = ('email','page','questionNumber')
    list_display = ('email','page','questionNumber')

admin.site.register(Profile, ProfileAdmin)
