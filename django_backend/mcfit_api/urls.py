from django.urls import path
from .views import ExerciseList,ExerciseDetail,ExerciseUpdate

app_name = 'mcfit_api'

urlpatterns = [
    path('<int:pk>/',ExerciseDetail.as_view(), name='detailcreate'),
    path('', ExerciseList.as_view(), name='listcreate'),
    path('<int:pk>/edit/',ExerciseUpdate.as_view(), name='update'),
]
