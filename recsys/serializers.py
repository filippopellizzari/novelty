from rest_framework import serializers
from .models import *

class RecommenderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recommender
        fields = '__all__'
