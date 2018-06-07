from django.contrib import admin
from .models import *

class InputModelAdmin(admin.ModelAdmin):
    list_display = ('name',)

#admin.site.register(InputModel, InputModelAdmin)
