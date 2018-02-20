from rest_framework.generics import GenericAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import *
from .models import MyUser

class ValidateTokenResetView(GenericAPIView):
    serializer_class = ValidateTokenResetSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DemographicUpdateView(UpdateAPIView):
    serializer_class = DemographicSerializer
    def get_user(self, email):
        try:
            return MyUser.objects.get(email=email)
        except MyUser.DoesNotExist:
            return None
    def update(self, request, *args, **kwargs):
        instance = self.get_user(email=request.data.get("email"))
        if(instance==None):
            return Response( status=status.HTTP_404_NOT_FOUND)
        instance.gender = request.data.get("gender")
        instance.age = request.data.get("age")
        instance.country = request.data.get("country")
        instance.is_active = True
        instance.save()
        return Response(status=status.HTTP_200_OK)
