from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import *
from .models import *


class ProfileDetail(APIView):
    def get_object(self, email):
        try:
            return Profile.objects.get(email=email)
        except Profile.DoesNotExist:
            raise Http404

    def get(self, request, email):
        profile = self.get_object(email)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ProfileCreateView(APIView):

    def post(self, request, format='json'):
        serializer = ProfileCreateSerializer(data=request.data)
        if serializer.is_valid():
            profile = serializer.save()
            return Response( status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileUpdateView(UpdateAPIView):
    serializer_class = ProfileSerializer
    def get_profile(self, email):
        try:
            return Profile.objects.get(email=email)
        except Profile.DoesNotExist:
            return None
    def update(self, request, *args, **kwargs):
        instance = self.get_profile(email=request.data.get("email"))
        if(instance==None):
            return Response( status=status.HTTP_404_NOT_FOUND)
        instance.page = request.data.get("page")
        instance.questionNumber = request.data.get("questionNumber")
        instance.save()
        return Response(status=status.HTTP_200_OK)
