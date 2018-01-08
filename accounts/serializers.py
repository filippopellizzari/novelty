from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User

class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=8, write_only=True)
    gender = serializers.CharField()

    def create(self, validated_data):
        user = User.objects.create_myuser(
            validated_data['email'],
            validated_data['password'],
            validated_data['gender']
            )
        return user

    class Meta:
        model = User
        fields = '__all__'
