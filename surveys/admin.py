from django.contrib import admin
from .models import *

class QuestionOrderInline(admin.TabularInline):
    model = QuestionOrder
    extra = 1

class OptionOrderInline(admin.TabularInline):
    model = OptionOrder
    extra = 1


class SurveyAdmin(admin.ModelAdmin):
    readonly_fields = ('last_update',)
    list_display = ('survey_id','survey_type', 'last_update',)
    inlines = (QuestionOrderInline,)

class QuestionAdmin(admin.ModelAdmin):
    readonly_fields = ('last_update',)
    list_display = ('question_id','genre', 'text', 'last_update',)
    inlines = (OptionOrderInline,)

class OptionAdmin(admin.ModelAdmin):
    list_display = ('option_id','text',)


class SurveyResponseAdmin(admin.ModelAdmin):
    readonly_fields = ('survey','username','started_at','completed_at',)
    list_display = ('survey','username', 'completed_at',)

class ResponseAdmin(admin.ModelAdmin):
    readonly_fields = ('survey_response','question', 'answer','started_at','completed_at',)
    list_display = ('survey_response','question', 'answer',)

admin.site.register(Survey, SurveyAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Option, OptionAdmin)
admin.site.register(SurveyResponse)
admin.site.register(Response)
