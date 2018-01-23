from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework import status
from rest_framework.response import Response



class SurveyResponseView(APIView):
    
    def get(self, request):
        surveyResponses = SurveyResponse.objects.all()
        serializer = SurveyResponseSerializer(surveyResponses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format='json'):
        serializer = SurveyResponseSerializer(data=request.data)
        if serializer.is_valid():
            surveyResponse = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
