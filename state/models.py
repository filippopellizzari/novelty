from django.db import models


class Profile(models.Model):
    email = models.CharField(max_length=100)
    page = models.CharField(max_length=30)
    questionNumber = models.IntegerField()
