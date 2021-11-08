from django.urls import path
from .views import ExerciseList

app_name = 'mcfit_api'

urlpatterns = [
    path('', ExerciseList.as_view(), name='listcreate'),
]
