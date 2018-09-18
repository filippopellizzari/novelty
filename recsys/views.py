from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import Http404

from .models import *
from .services import *
from movies.serializers import *

class RecommendView(APIView):
    def post(self, request):
        movies = recommend(
            request.data.get("algorithm"),
            request.data.get("content"),
            request.data.get("selected_items"),
            request.data.get("reclist_length")
            )
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class GetContentView(APIView):
    def post(self, request):
        content = get_content(request.data.get("selected_items"))
        return Response(content,status=status.HTTP_200_OK)
