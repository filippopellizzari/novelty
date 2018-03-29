from rest_framework import serializers
from .models import *

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('email', 'page', 'questionNumber','survey_code','valid_survey')

class ProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('email', 'page','questionNumber','survey_code')
    def create(self, validated_data):
        profile = Profile.objects.create(**validated_data)
        return profile


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('question', 'answer')

class SurveyResponseSerializer(serializers.ModelSerializer):
    responses = AnswerSerializer(many=True)
    class Meta:
        model = SurveyResponse
        fields = ('email','survey_id','responses')
    def create(self, validated_data):
        responses_data = validated_data.pop('responses')
        surveyResponse = SurveyResponse.objects.create(**validated_data)
        for response_data in responses_data:
            Answer.objects.create(
                survey_response=surveyResponse,
                email=validated_data['email'],
                survey_id=validated_data['survey_id'],
                **response_data
            )
        return surveyResponse

class SurveyAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('email','survey_id', 'question', 'answer')
