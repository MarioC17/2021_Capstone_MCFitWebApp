from django.http import response
from mcfit.models import Exercisetable
from rest_framework import generics, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.generics import (
    DestroyAPIView,
    ListAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    ListCreateAPIView,
    RetrieveDestroyAPIView
)
from .serializers import ExercisetableSerializer


class ExerciseList(generics.ListCreateAPIView):
    queryset = Exercisetable.objects.all()
    serializer_class = ExercisetableSerializer

class ExerciseDetail(generics.RetrieveDestroyAPIView):
    queryset = Exercisetable.objects.all()   
    serializer_class = ExercisetableSerializer

class ExerciseUpdate(generics.UpdateAPIView):
    queryset = Exercisetable.objects.all()   
    serializer_class = ExercisetableSerializer

class ExerciseDelete(generics.DestroyAPIView):
    queryset = Exercisetable.objects.all()   
    serializer_class = ExercisetableSerializer
#view classes docs    
#https://www.django-rest-framework.org/api-guide/generic-views/#concrete-view-classes
