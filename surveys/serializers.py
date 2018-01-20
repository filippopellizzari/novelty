
from rest_framework import serializers
from .models import Survey
from .models import Answer

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('question_number', 'answer_text')

class SurveySerializer(serializers.ModelSerializer):

    #answers = AnswerSerializer(many=True)

    class Meta:
        model = Survey
        fields = ('__all__')

    def create(self, validated_data):
        #answer_data = validated_data.pop('answers')
        survey = Survey.objects.create(**validated_data)
        #Answer.objects.create(survey=survey, **answer_data)
        return survey
