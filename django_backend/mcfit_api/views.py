import requests
from django.http import response
from mcfit.models import Exercisetable,Profiles,Workouts,SocialaccountSocialaccount,AuthUser,Nutritions
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
from .serializers import ExercisetableSerializer,ProfilesSerializer,WorkoutsSerializer,SocialAccountSerializer, NutritionsSerializer,AuthUserSerializer

fat_secret_url ="https://oauth.fatsecret.com/connect/token"
fat_secret_client_id = "e2f7d0ccecf64cc79ee7dbdf1e128efe"
fat_secret_client_secret = "9c85818f772c4ba8abc94ed6c0d045c2"

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

class AuthDetail(generics.RetrieveAPIView):
    queryset = AuthUser.objects.all()   
    serializer_class = AuthUserSerializer

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
    
# FAT SECRET API
class FatSecretAPIToken(generics.ListCreateAPIView):
    def get(self, request):
        data = {'grant_type': 'client_credentials'}
        r = requests.post(fat_secret_url, data=data, auth=(fat_secret_client_id, fat_secret_client_secret))
        result = r.json()
        if "error" in result:
            return Response({"status": "failure", "data": result})
        else: 
            return Response({"status": "success", "data": result})

class FatSecretAPIFoodSearch(generics.ListCreateAPIView):
    def get(self, request, search_exp):
        url = 'https://platform.fatsecret.com/rest/server.api' 
        params = {'method': 'foods.search', 'format': 'json', 'search_expression': search_exp}
        headers = {"Authorization": "Bearer " + request.query_params.get('fat-secret-token', None), "Content-Type": "application/json" }
        r = requests.get(url, params, headers=headers)
        result = r.json()
        if "error" in result:
            return Response({"status": "failure", "data": result})
        else: 
            return Response({"status": "success", "data": result})

# Nutrition
class NutritionList(generics.ListCreateAPIView):
    serializer_class = NutritionsSerializer
    queryset = Nutritions.objects.all()

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Nutritions.objects.filter(user=user_id)

class NutritionListCreate(generics.ListCreateAPIView):
    serializer_class = NutritionsSerializer(many=True)
    queryset = Nutritions.objects.all()
        
    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id', None)
        nutritions_data = request.data.get('nutritions', [])

        # first delete all entries
        nutritions_preferences_obj = Nutritions.objects.filter(user=user_id)
        nutritions_preferences_obj.delete()
        
        for nutrition_data in nutritions_data:
            Nutritions.objects.create(
                user_id = user_id,
                food_id = nutrition_data['foodId'],
                food_name = nutrition_data['input'],
                food_type = nutrition_data['foodType'],
                count =nutrition_data['count'],
                calories = nutrition_data['calories'],
                carbs = nutrition_data['carbs'],
                fats = nutrition_data['fats'],
                proteins = nutrition_data['proteins']
            )
        return Response({"status": "success"})
#view classes docs    
#https://www.django-rest-framework.org/api-guide/generic-views/#concrete-view-classes
