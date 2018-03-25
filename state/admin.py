from django.contrib import admin
from .models import *

class ProfileAdmin(admin.ModelAdmin):
    readonly_fields = ('email','page','questionNumber','valid_survey')
    list_display = ('email','page','questionNumber','valid_survey')

class AnswerAdmin(admin.ModelAdmin):
    readonly_fields = ('email','survey_id','question', 'answer')
    list_display = ('email','survey_id','question', 'answer',)


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Answer, AnswerAdmin)
