from django.db import models
from .models import *


class Survey(models.Model):
    survey_id = models.IntegerField()
    survey_type = models.CharField(max_length=30)
    last_update = models.DateTimeField(auto_now=True)
    opening_time = models.DateTimeField(null=True)
    closing_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.survey_id) + ": " + self.survey_type

class Question(models.Model):
    question_id = models.IntegerField()
    genre = models.CharField(max_length=30)
    text = models.TextField()
    last_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.question_id) + ": " + self.text

class Option(models.Model):
    option_id = models.IntegerField()
    text = models.CharField(max_length=30)
    question = models.ForeignKey(Question, related_name='options', null=True)

    def __str__(self):
        return str(self.option_id) + ": " + self.text

class QuestionOrder(models.Model):
    question = models.ForeignKey(Question, related_name='question_orders')
    survey = models.ForeignKey(Survey, related_name='question_orders')
    order = models.IntegerField()

class OptionOrder(models.Model):
    option = models.ForeignKey(Option, related_name='option_orders')
    question = models.ForeignKey(Question, related_name='option_orders')
    order = models.IntegerField()

class SurveyResponse(models.Model):
    survey_id = models.CharField(max_length=30)
    username = models.CharField(max_length=100)
    completed_at = models.DateTimeField(auto_now_add=True)

class Response(models.Model):
    survey_response = models.ForeignKey(SurveyResponse, related_name='responses')
    question = models.TextField()
    answer = models.CharField(max_length=30)
