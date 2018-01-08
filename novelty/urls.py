from django.conf.urls import url
from django.contrib import admin
from django.views.generic import TemplateView

from movies import views as m_views
from accounts import views as a_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^users/',  a_views.UserList.as_view()),
    url(r'^movies/', m_views.MovieList.as_view()),
    url(r'^', TemplateView.as_view(template_name="index.html")),
]
