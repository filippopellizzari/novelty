from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from .serializers import UserSerializer, ValidateTokenResetSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

class UserCreateView(APIView):

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ValidateTokenResetView(GenericAPIView):

    serializer_class = ValidateTokenResetSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
