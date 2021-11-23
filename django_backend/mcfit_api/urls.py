from django.urls import path
from .views import ExerciseList,ExerciseDetail,ExerciseUpdate,ExerciseDelete

app_name = 'mcfit_api'

urlpatterns = [
    path('exercise/<int:pk>/',ExerciseDetail.as_view(), name='detailcreate'),
    path('exercises', ExerciseList.as_view(), name='listcreate'),
    path('exercise/edit/<int:pk>/',ExerciseUpdate.as_view(), name='update'),
    path('exercise/delete/<int:pk>/',ExerciseDelete.as_view(), name='delete')
]
