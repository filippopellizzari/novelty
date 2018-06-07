from django.db import models

class Recommender(models.Model):
    rec_id = models.CharField(max_length=30,null=True)
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name
