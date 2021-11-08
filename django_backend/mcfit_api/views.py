from rest_framework import generics
from mcfit.models import Exercisetable
from .serializers import ExercisetableSerializer

class ExerciseList(generics.ListCreateAPIView):
    queryset = Exercisetable.objects.all()
    serializer_class = ExercisetableSerializer
    pass

'''class PostDetail(generics.RetrieveDestroyAPIView):
    pass'''
#view classes docs    
#https://www.django-rest-framework.org/api-guide/generic-views/#concrete-view-classes