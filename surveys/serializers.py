from rest_framework import serializers
from .models import SurveyResponse


class SurveyResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = SurveyResponse
        fields = ('username')

    def create(self, validated_data):
        surveyResponse = SurveyResponse.objects.create(**validated_data)
        return surveyResponse
