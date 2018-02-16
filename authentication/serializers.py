from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.utils.http import urlsafe_base64_decode as uid_decoder
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_text
from rest_framework.exceptions import ValidationError

from .models import MyUser

class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=MyUser.objects.all())]
            )
    password = serializers.CharField(
            required=True,
            min_length=8,
            write_only=True
            )

    def create(self, validated_data):
        user = MyUser.objects.create_user(
            validated_data['email'],
            validated_data['password'],
            validated_data['gender'],
            validated_data['age'],
            validated_data['country'],
            )
        return user

    class Meta:
        model = MyUser
        fields = ('email', 'password','gender', 'age', 'country')


class ValidateTokenResetSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()

    def validate(self, attrs):
        self._errors = {}

        # Decode the uidb64 to uid to get User object
        try:
            uid = force_text(uid_decoder(attrs['uid']))
            self.user = MyUser._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, MyUser.DoesNotExist):
            raise ValidationError({'uid': ['Invalid value']})
        if not default_token_generator.check_token(self.user, attrs['token']):
            raise ValidationError({'token': ['Invalid value']})
        return attrs

class SocialUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('email','gender','age','country')
