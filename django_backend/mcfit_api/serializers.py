from rest_framework import serializers
from mcfit.models import Exercisetable,Profiles,Workouts,SocialaccountSocialaccount

class ExercisetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercisetable
        fields = ('exercise_id','name','muscle','equipment','description','benefits','instructions','video')

class ProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiles
        fields = ('profile_id','user','emergency_contact','fitness_goal','gender','weight','dob','address','phone_num','height','physical_activity','diet','photo')

class WorkoutsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workouts
        fields = ('workout_id','exercise','user','date','reps','sets','rest','rir','load','notes')

class SocialAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialaccountSocialaccount
        fields = ('provider','user','uid','extra_data')