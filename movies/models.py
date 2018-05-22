from django.db import models


class Movie(models.Model):
    vote_count = models.IntegerField()
    id = models.IntegerField(primary_key=True)
    vote_average = models.FloatField()
    title = models.CharField(max_length=100)
    popularity = models.FloatField()
    poster_path = models.CharField(max_length=100)
    release_date = models.CharField(max_length=30)
    overview = models.TextField(default="")
