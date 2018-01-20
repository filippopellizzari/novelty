from django.db import models
from django.contrib.auth.models import User


class Survey(models.Model):
    survey_id = models.CharField(max_length=30)
    submit_date = models.DateTimeField(auto_now_add=True)
    #user_id = models.CharField(max_length=30)

    def __str__(self):
        return self.survey_id

class Answer(models.Model):
    survey = models.ForeignKey(Survey, related_name='answers')
    question_number = models.IntegerField()
    answer_text = models.CharField(max_length=30)
