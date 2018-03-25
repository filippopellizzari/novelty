from import_export.admin import ImportExportModelAdmin
from import_export.resources import ModelResource
from import_export import fields, widgets
from django.contrib import admin
from adminsortable2.admin import SortableInlineAdminMixin
from .models import *

class QuestionOrderInline(SortableInlineAdminMixin, admin.TabularInline):
    model = QuestionOrder
    extra = 1

class OptionOrderInline(SortableInlineAdminMixin, admin.TabularInline):
    model = OptionOrder
    extra = 1

class SurveyAdmin(admin.ModelAdmin):
    readonly_fields = ('survey_id','last_update')
    list_display = ('survey_id','survey_name','survey_type', 'last_update',)
    inlines = (QuestionOrderInline,)

class QuestionAdmin(admin.ModelAdmin):
    readonly_fields = ('last_update','question_id')
    list_display = ('question_id','genre', 'text', 'last_update',)
    inlines = (OptionOrderInline,)

class OptionAdmin(admin.ModelAdmin):
    list_display = ('option_id','text',)

class ResponseInline(admin.StackedInline):
    readonly_fields = ('survey_response','question', 'answer', 'survey_id', 'email')
    model = Response
    extra = 1

    def has_add_permission(self, request):
        return False
    def has_delete_permission(self, request, obj=None):
        return False

class SurveyResponseResource(ModelResource):
    class Meta:
        model = SurveyResponse
        fields = ('id','email', 'survey_id', 'completed_at',)
        export_order = ('id','email', 'survey_id', 'completed_at',)

class SurveyResponseAdmin(ImportExportModelAdmin):

    resource_class = SurveyResponseResource

    readonly_fields = ('email', 'survey_id','completed_at',)
    list_display = ('email', 'survey_id', 'completed_at',)
    inlines = (ResponseInline,)
    search_fields = ('email','survey_id', )

    def has_add_permission(self, request):
        return False

class ResponseResource(ModelResource):
    class Meta:
        model = Response
        fields = ('id','email','survey_id','completed_at','question', 'answer', 'is_valid')
        export_order = ('id', 'email','survey_id','completed_at','question', 'answer','is_valid' )

class ResponseAdmin(ImportExportModelAdmin):
    resource_class = ResponseResource

    readonly_fields = ('email','survey_id','completed_at','question',
                        'answer','survey_response','is_valid')
    list_display = ('email','survey_id','completed_at','question',
                        'answer','is_valid')

    def has_add_permission(self, request):
        return False

admin.site.register(Survey, SurveyAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Option, OptionAdmin)
admin.site.register(Response,ResponseAdmin )
