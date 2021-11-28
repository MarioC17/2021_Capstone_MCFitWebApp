from rest_framework import serializers
from mcfit.models import Exercisetable,Profiles,Workouts

class ExercisetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercisetable
        fields = ('exercise_id','name','muscle','equipment','description','benefits','instructions','video')

class ProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiles
        fields = ('profile_id','user','emergency_contact','fitness_goal','gender','body_type','weight','dob','height','physical_activity','diet','photo')

class WorkoutsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workouts
        fields = ('workout_id','exercise','user','date','reps','sets','rest','rir','load','notes')