from rest_framework import serializers
from .models import *


class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = ('question', 'answer')

class SurveyResponseSerializer(serializers.ModelSerializer):
    responses = ResponseSerializer(many=True)
    class Meta:
        model = SurveyResponse
        fields = ('username', 'survey_id','responses')
    def create(self, validated_data):
        responses_data = validated_data.pop('responses')
        surveyResponse = SurveyResponse.objects.create(**validated_data)
        for response_data in responses_data:
            Response.objects.create(survey_response=surveyResponse, **response_data)
        return surveyResponse
