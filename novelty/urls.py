from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from movies.views import *
from authentication.views import UserCreateView, ValidateTokenResetView
from surveys.views import *

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^api/movies/search-by-title/(?P<title>[\w\ ]+)/(?P<page>[0-9]+)/(?P<itemsPerPage>[0-9]+)/$', SearchByTitle.as_view()),
    url(r'^api/movies/search-total-results/(?P<title>[\w\ ]+)/$', SearchTotalResults.as_view()),
    url(r'^api/movies/popular/(?P<page>[0-9]+)/(?P<itemsPerPage>[0-9]+)/$', PopularMovies.as_view()),

    url(r'^api/surveys/$', SurveyList.as_view()),
    url(r'^api/surveys/(?P<survey_id>[0-9]+)/$', SurveyDetail.as_view()),
    url(r'^api/surveys/survey-submit/$', SurveyResponseView.as_view()),

    url(r'^api/auth/social/', include('rest_framework_social_oauth2.urls')),

    url(r'^api/auth/token/obtain/$', TokenObtainPairView.as_view()),
    url(r'^api/auth/token/refresh/$', TokenRefreshView.as_view()),
    url(r'^api/auth/signup/$', UserCreateView.as_view()),
    url(r'^api/auth/validate-token/$', ValidateTokenResetView.as_view()),
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/auth/', include('djoser.urls')),
    url(r'^api/rest-auth/', include('rest_auth.urls')),

    url(r'^api/$', get_schema_view()),

    url(r'^', TemplateView.as_view(template_name="index.html")),
]
