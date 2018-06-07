from django.contrib import admin
from .models import *

class RecommenderAdmin(admin.ModelAdmin):
    list_display = ('rec_id','name',)

admin.site.register(Recommender, RecommenderAdmin)
