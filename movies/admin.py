from django.contrib import admin
from .models import Movie

class MovieAdmin(admin.ModelAdmin):
    readonly_fields = ('title', 'year',)
    list_display = ('title', 'year')

admin.site.register(Movie, MovieAdmin)
