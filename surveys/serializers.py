from rest_framework import serializers
from .models import *


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('option_id', 'text')

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ('question_id', 'genre', 'text', 'options')

class SurveySerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Survey
        fields = ('survey_id', 'survey_type', 'questions')



class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = ('question', 'answer')

class SurveyResponseSerializer(serializers.ModelSerializer):
    responses = ResponseSerializer(many=True)
    class Meta:
        model = SurveyResponse
        fields = ('email', 'survey_id','responses')
    def create(self, validated_data):
        responses_data = validated_data.pop('responses')
        surveyResponse = SurveyResponse.objects.create(**validated_data)
        for response_data in responses_data:
            Response.objects.create(survey_response=surveyResponse, **response_data)
        return surveyResponse
