from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView

from movies.views import MovieList

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^movies/', MovieList.as_view()),
    url(r'^', TemplateView.as_view(template_name="index.html")),
]
