from rest_framework.views import APIView
from .serializers import SurveySerializer
from .models import Survey
from rest_framework import status
from rest_framework.response import Response


class SurveyView(APIView):

    def get(self, request):
        surveys = Survey.objects.all()
        serializer = SurveySerializer(surveys, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format='json'):
        serializer = SurveySerializer(data=request.data)
        if serializer.is_valid():
            survey = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
