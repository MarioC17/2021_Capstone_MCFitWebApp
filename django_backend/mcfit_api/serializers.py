from rest_framework import serializers
from mcfit.models import Exercisetable

class ExercisetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercisetable
        fields = ('exercise_id','name','muscle','equipment','description','benefits','instructions','video')
        #fields = ('name','muscle')

