from rest_framework.views import APIView
from django.http import Http404
from .serializers import *
from .models import *
from rest_framework import status
from rest_framework.response import Response


class SurveyList(APIView):
    def get(self, request, format='json'):
        surveys = Survey.objects.all()
        serializer = SurveySerializer(surveys, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SurveyDetail(APIView):
    def get_object(self, survey_id):
        try:
            return Survey.objects.get(survey_id=survey_id)
        except Survey.DoesNotExist:
            raise Http404

    def get(self, request, survey_id, format='json'):
        survey = self.get_object(survey_id)
        serializer = SurveySerializer(survey)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SurveyResponseView(APIView):

    def get(self, request, format='json'):
        surveyResponses = SurveyResponse.objects.all()
        serializer = SurveyResponseSerializer(surveyResponses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format='json'):
        serializer = SurveyResponseSerializer(data=request.data)
        if serializer.is_valid():
            surveyResponse = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
