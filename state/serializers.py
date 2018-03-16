from rest_framework import serializers
from .models import *

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('email', 'page', 'questionNumber')



class ProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('email', 'page','questionNumber')
    def create(self, validated_data):
        profile = Profile.objects.create(**validated_data)
        return profile
