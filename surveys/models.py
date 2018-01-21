from django.db import models


class Survey(models.Model):
    survey_id = models.CharField(max_length=30)
    survey_type = models.CharField(max_length=30)
    last_update = models.DateTimeField(null=True)
    opening_time = models.DateTimeField(null=True)
    closing_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.survey_id

class Question(models.Model):
    question_id = models.CharField(max_length=30)
    genre = models.CharField(max_length=30)
    text = models.TextField()
    last_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question_id

class Option(models.Model):
    option_id = models.CharField(max_length=30)
    text = models.CharField(max_length=30)
    question = models.ForeignKey(Question, related_name='options')

    def __str__(self):
        return self.option_id

class QuestionOrder(models.Model):
    question = models.ForeignKey(Question, related_name='question_orders')
    survey = models.ForeignKey(Survey, related_name='question_orders')
    order = models.IntegerField()

class SurveyResponse(models.Model):
    survey = models.ForeignKey(Survey, related_name='survey_responses')
    username = models.CharField(max_length=100)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(auto_now_add=True)

class Response(models.Model):
    survey_response = models.ForeignKey(SurveyResponse, related_name='responses')
    question = models.ForeignKey(Question, related_name='responses')
    answer = models.CharField(max_length=30)
