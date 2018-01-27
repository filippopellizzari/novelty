from django.db import models


class Movie(models.Model):
    imdb_id = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    director = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    plot = models.TextField()
    poster = models.URLField()
    year = models.IntegerField()
    imdb_rating = models.FloatField()

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["title"]
