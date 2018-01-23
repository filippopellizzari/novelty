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

class ResponseInline(admin.StackedInline):
    readonly_fields = ('survey_response','question', 'answer')
    model = Response
    extra = 1

class SurveyResponseAdmin(admin.ModelAdmin):
    readonly_fields = ('username', 'survey_id','completed_at',)
    list_display = ('username', 'survey_id', 'completed_at',)
    inlines = (ResponseInline,)


admin.site.register(Survey, SurveyAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Option, OptionAdmin)
admin.site.register(SurveyResponse,SurveyResponseAdmin )
