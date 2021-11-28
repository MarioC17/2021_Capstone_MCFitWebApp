from django.http import response
from mcfit.models import Exercisetable,Profiles,Workouts
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
from .serializers import ExercisetableSerializer,ProfilesSerializer,WorkoutsSerializer


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

class UserList(generics.ListCreateAPIView):
    queryset = Profiles.objects.all()
    serializer_class = ProfilesSerializer

class UserDetail(generics.RetrieveDestroyAPIView):
    queryset = Profiles.objects.all()   
    serializer_class = ProfilesSerializer

class UserUpdate(generics.UpdateAPIView):
    queryset = Profiles.objects.all()   
    serializer_class = ProfilesSerializer

class UserDelete(generics.DestroyAPIView):
    queryset = Profiles.objects.all()   
    serializer_class = ProfilesSerializer 

class WorkoutList(generics.ListCreateAPIView):
    queryset = Workouts.objects.all()
    serializer_class = WorkoutsSerializer

class WorkoutDetail(generics.RetrieveDestroyAPIView):
    queryset = Workouts.objects.all()   
    serializer_class = WorkoutsSerializer

class WorkoutUpdate(generics.UpdateAPIView):
    queryset = Workouts.objects.all()   
    serializer_class = WorkoutsSerializer

class WorkoutDelete(generics.DestroyAPIView):
    queryset = Workouts.objects.all()   
    serializer_class = WorkoutsSerializer 

#view classes docs    
#https://www.django-rest-framework.org/api-guide/generic-views/#concrete-view-classes
