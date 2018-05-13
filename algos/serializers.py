from rest_framework import serializers
from .models import *

class InputModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = InputModel
        fields = '__all__'
