from django.db import models
from .models import *


class Option(models.Model):
    option_id = models.IntegerField()
    text = models.CharField(max_length=30)

    def __str__(self):
        return str(self.option_id) + ": " + self.text

    class Meta:
        ordering = ('option_id',)

class Question(models.Model):
    question_id = models.IntegerField()
    genre = models.CharField(max_length=30)
    text = models.TextField()
    last_update = models.DateTimeField(auto_now=True)
    options = models.ManyToManyField(Option, through="OptionOrder")

    def __str__(self):
        return str(self.question_id) + ": " + self.text

    class Meta:
        ordering = ('question_id',)

class Survey(models.Model):
    TYPE_CHOICES = (
        ('Between-subject', 'Between-subject'),
        ('Within-subject', 'Within-subject'),
    )
    survey_id = models.AutoField(primary_key=True)
    survey_name = models.CharField(max_length=100)
    survey_type = models.CharField(max_length=30, choices=TYPE_CHOICES)
    last_update = models.DateTimeField(auto_now=True)
    opening_time = models.DateTimeField(null=True)
    closing_time = models.DateTimeField(null=True, blank=True)
    questions = models.ManyToManyField(Question, through="QuestionOrder")

    def __str__(self):
        return str(self.survey_id)

class QuestionOrder(models.Model):
    question = models.ForeignKey(Question, related_name='question_to_survey')
    survey = models.ForeignKey(Survey, related_name='survey_to_question')

class OptionOrder(models.Model):
    option = models.ForeignKey(Option, related_name='option_to_question')
    question = models.ForeignKey(Question, related_name='question_to_option')

class SurveyResponse(models.Model):
    email = models.CharField(max_length=100)
    completed_at = models.DateTimeField(auto_now_add=True)
    survey_id = models.ForeignKey(Survey)
    is_valid = models.BooleanField(default=True)

class Response(models.Model):
    survey_response = models.ForeignKey(SurveyResponse, related_name='responses')
    question = models.TextField()
    answer = models.CharField(max_length=30)
    survey_id = models.CharField(null=True,max_length=30)
    email = models.CharField(null=True,max_length=100)
    completed_at = models.DateTimeField(auto_now_add=True)
    is_valid = models.BooleanField(default=True)
