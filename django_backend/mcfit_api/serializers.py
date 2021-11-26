from rest_framework import serializers
from mcfit.models import Exercisetable
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ('id','email','first_name','last_name','phone_number','emergency_contact','password','dob')

class ExercisetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercisetable
        fields = ('exercise_id','name','muscle','equipment','description','benefits','instructions','video')


