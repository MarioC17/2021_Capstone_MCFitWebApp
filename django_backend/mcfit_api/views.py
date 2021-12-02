from django.http import response
from mcfit.models import Exercisetable,Profiles,Workouts,SocialaccountSocialaccount,AuthUser
from rest_framework import generics, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from django.db.models import Q, query
from django.http import request
from django.views.generic import ListView
import operator
from functools import reduce
from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    DestroyAPIView,
    ListAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    ListCreateAPIView,
    RetrieveDestroyAPIView
)
from .serializers import ExercisetableSerializer,ProfilesSerializer,WorkoutsSerializer,SocialAccountSerializer


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

class ProfileList(generics.ListCreateAPIView):
    serializer_class = ProfilesSerializer
    queryset = Profiles.objects.all()



#Find profile by user id
class ProfileDetail(generics.RetrieveDestroyAPIView):
    serializer_class = ProfilesSerializer
    queryset = Profiles.objects.all()
    lookup_field = 'user_id'
    lookup_url_kwarg = 'user_id'

class ProfileUpdate(generics.UpdateAPIView):
    serializer_class = ProfilesSerializer
    queryset = Profiles.objects.all()
    lookup_field = 'user_id'
    lookup_url_kwarg = 'user_id'

class ProfileDelete(generics.DestroyAPIView):
    serializer_class = ProfilesSerializer
    queryset = Profiles.objects.all()
    lookup_field = 'user_id'
    lookup_url_kwarg = 'user_id' 

#Gets workouts under the user ordered by date. Sort by date in react
class WorkoutUserList(ListAPIView):
    serializer_class = WorkoutsSerializer
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Workouts.objects.filter(user=user_id).order_by('date')

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

#Find user ID by social account uid
class UserDetail(generics.RetrieveDestroyAPIView):
    queryset = SocialaccountSocialaccount.objects.all()
    serializer_class = SocialAccountSerializer
    lookup_field = 'uid'
    lookup_url_kwarg = 'uid'

class UserList(generics.ListCreateAPIView):
    queryset = SocialaccountSocialaccount.objects.all()
    serializer_class = SocialAccountSerializer

#view classes docs    
#https://www.django-rest-framework.org/api-guide/generic-views/#concrete-view-classes
