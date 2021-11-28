from django.urls import path
from .views import ExerciseList,ExerciseDetail,ExerciseUpdate,ExerciseDelete,UserList,UserDetail,UserUpdate,UserDelete,WorkoutList,WorkoutDetail,WorkoutUpdate,WorkoutDelete

app_name = 'mcfit_api'

urlpatterns = [
    path('exercise/<int:pk>/',ExerciseDetail.as_view(), name='detailcreate'),
    path('exercises', ExerciseList.as_view(), name='listcreate'),
    path('exercise/edit/<int:pk>/',ExerciseUpdate.as_view(), name='update'),
    path('exercise/delete/<int:pk>/',ExerciseDelete.as_view(), name='delete'),
    path('user/<int:pk>/',UserDetail.as_view(), name='detailcreate'),
    path('user', UserList.as_view(), name='listcreate'),
    path('user/edit/<int:pk>/',UserUpdate.as_view(), name='update'),
    path('user/delete/<int:pk>/',UserDelete.as_view(), name='delete'),
    path('workout/<int:pk>/',WorkoutDetail.as_view(), name='detailcreate'),
    path('workout', WorkoutList.as_view(), name='listcreate'),
    path('workout/edit/<int:pk>/',WorkoutUpdate.as_view(), name='update'),
    path('workout/delete/<int:pk>/',WorkoutDelete.as_view(), name='delete')
]
