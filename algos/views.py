from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import Http404

from .models import *
from .serializers import *
from .services import *
from movies.serializers import *

class InputModelList(APIView):
    def get(self, request):
        models = InputModel.objects.all()
        serializer = InputModelSerializer(models, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RecommendView(APIView):
    def get_input_model(self, input_model_id):
        try:
            return InputModel.objects.get(id=input_model_id)
        except InputModel.DoesNotExist:
            raise Http404

    def post(self, request):
        model = self.get_input_model(request.data.get("input_model_id"))
        movies = recommend(model.file_npz,request.data.get("selected_items"),request.data.get("reclist_length"))
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
