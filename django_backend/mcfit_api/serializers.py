from rest_framework import serializers
from mcfit.models import Exercisetable,UserInfo
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ('id','email','first_name','last_name','phone_number','emergency_contact','password','dob','fitness_goal','gender','body_type','weight','height','physical_activity','diet')

class ExercisetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercisetable
        fields = ('exercise_id','name','muscle','equipment','description','benefits','instructions','video')


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('user_id','user,emergency_contact','fitness_goal','gender','body_type','weight','dob','height','physical_activity','diet','photo')
