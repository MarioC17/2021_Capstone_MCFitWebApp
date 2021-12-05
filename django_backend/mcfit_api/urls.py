from django.urls import path
from .views import ExerciseList,ExerciseDetail,ExerciseUpdate,ExerciseDelete,ProfileList,ProfileDetail,ProfileUpdate,ProfileDelete,WorkoutUserList,WorkoutDetail,WorkoutUpdate,WorkoutDelete,UserDetail,WorkoutList,UserList,FatSecretAPIToken,FatSecretAPIFoodSearch,NutritionList, NutritionListCreate,AuthDetail

app_name = 'mcfit_api'

urlpatterns = [
    path('exercise/<int:pk>/',ExerciseDetail.as_view(), name='detailcreate'),
    path('exercises', ExerciseList.as_view(), name='listcreate'),
    path('exercise/edit/<int:pk>/',ExerciseUpdate.as_view(), name='update'),
    path('exercise/delete/<int:pk>/',ExerciseDelete.as_view(), name='delete'),
    path('profile/<int:user_id>/',ProfileDetail.as_view(), name='profiledetailcreate'),
    path('user/<int:uid>/',UserDetail.as_view(), name='userdetailcreate'),
    path('clients',UserList.as_view(), name='userlistcreate'),
    path('Auth/<int:pk>/',AuthDetail.as_view(), name='Authdetail'),

    path('profile', ProfileList.as_view(), name='profilelistcreate'),
    path('profile/edit/<int:user_id>/',ProfileUpdate.as_view(), name='profileupdate'),
    path('profile/delete/<int:user_id>/',ProfileDelete.as_view(), name='profiledelete'),
    path('workout/<int:user_id>/',WorkoutDetail.as_view(), name='workoutdetailcreate'),
    #Shows all workouts for that user
    path('workout/user/<int:user_id>/', WorkoutUserList.as_view(), name='UsersWorkouts'),
    path('workout', WorkoutList.as_view(), name='Workoutlistcreate'),
    path('workout/edit/<int:pk>/',WorkoutUpdate.as_view(), name='workoutupdate'),
    path('workout/delete/<int:pk>/',WorkoutDelete.as_view(), name='workoutdelete'),
    # FAT SECRET API
    path('fatsecret/token', FatSecretAPIToken.as_view()),
    path('fatsecret/food/search/<str:search_exp>/', FatSecretAPIFoodSearch.as_view()),
    # Nutrition
    path('nutritions/<int:user_id>/<str:date>', NutritionList.as_view(), name='nutritionlist'),
    path('nutritions/<str:date>/add', NutritionListCreate.as_view(), name='nutritionlistcreate'),
]
