from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from django.contrib.auth.models import User

from .utils import CsrfExemptSessionAuthentication

class UserCreate(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
