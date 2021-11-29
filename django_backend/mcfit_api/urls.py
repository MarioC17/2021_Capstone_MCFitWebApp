from django.urls import path
from .views import ExerciseList,ExerciseDetail,ExerciseUpdate,ExerciseDelete,ProfileList,ProfileDetail,ProfileUpdate,ProfileDelete,WorkoutList,WorkoutDetail,WorkoutUpdate,WorkoutDelete

app_name = 'mcfit_api'

urlpatterns = [
    path('exercise/<int:pk>/',ExerciseDetail.as_view(), name='detailcreate'),
    path('exercises', ExerciseList.as_view(), name='listcreate'),
    path('exercise/edit/<int:pk>/',ExerciseUpdate.as_view(), name='update'),
    path('exercise/delete/<int:pk>/',ExerciseDelete.as_view(), name='delete'),
    path('profile/<int:pk>/',ProfileDetail.as_view(), name='detailcreate'),
    path('profile', ProfileList.as_view(), name='listcreate'),
    path('profile/edit/<int:pk>/',ProfileUpdate.as_view(), name='update'),
    path('profile/delete/<int:pk>/',ProfileDelete.as_view(), name='delete'),
    path('workout/<int:pk>/',WorkoutDetail.as_view(), name='detailcreate'),
    path('workout', WorkoutList.as_view(), name='listcreate'),
    path('workout/edit/<int:pk>/',WorkoutUpdate.as_view(), name='update'),
    path('workout/delete/<int:pk>/',WorkoutDelete.as_view(), name='delete')
]
