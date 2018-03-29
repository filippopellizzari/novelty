from django.db import models


class Profile(models.Model):
    email = models.CharField(max_length=100)
    page = models.CharField(max_length=30)
    questionNumber = models.IntegerField()
    survey_code = models.CharField(max_length=100)
    valid_survey = models.BooleanField(default=False)


class SurveyResponse(models.Model):
    email = models.CharField(max_length=100)
    survey_id = models.CharField(null=True,max_length=30)

class Answer(models.Model):
    survey_response = models.ForeignKey(SurveyResponse, related_name='responses')
    question = models.TextField()
    answer = models.CharField(max_length=30)
    email = models.CharField(max_length=100)
    survey_id = models.CharField(null=True,max_length=30)
