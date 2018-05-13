from rest_framework import serializers
from .models import *
from algos.serializers import InputModelSerializer

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('option_id', 'text')

class QuestionSerializer(serializers.ModelSerializer):

    options = serializers.SerializerMethodField('get_option_list')

    def get_option_list(self, instance):
        ids = OptionOrder.objects.filter(question=instance.question_id)\
            .order_by('order').values_list('option', flat=True)
        options = list(map(lambda x: Option.objects.get(option_id=x), ids))
        return OptionSerializer(options, many=True).data

    class Meta:
        model = Question
        fields = ('question_id', 'genre', 'text', 'options')


class SurveySerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField('get_question_list')
    algorithms = InputModelSerializer(many=True)

    def get_question_list(self, instance):
        ids = QuestionOrder.objects.filter(survey=instance.survey_id)\
            .order_by('order').values_list('question', flat=True)
        questions = list(map(lambda x: Question.objects.get(question_id=x), ids))
        return QuestionSerializer(questions, many=True).data

    class Meta:
        model = Survey
        fields = ('survey_id', 'survey_type', 'questions', 'algorithms')

class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = ('question', 'answer')

class SurveyResponseSerializer(serializers.ModelSerializer):
    responses = ResponseSerializer(many=True)
    class Meta:
        model = SurveyResponse
        fields = ('email', 'survey_id','responses','is_valid')
    def create(self, validated_data):
        responses_data = validated_data.pop('responses')
        surveyResponse = SurveyResponse.objects.create(**validated_data)
        for response_data in responses_data:
            Response.objects.create(
                survey_response=surveyResponse,
                email=validated_data['email'],
                survey_id=validated_data['survey_id'],
                is_valid=validated_data['is_valid'],
                **response_data
            )
        return surveyResponse
