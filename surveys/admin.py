from django.contrib import admin
from .models import Survey

class SurveyAdmin(admin.ModelAdmin):
    readonly_fields = ('submit_date',)
    list_display = ('survey_id', 'submit_date')

admin.site.register(Survey, SurveyAdmin)
