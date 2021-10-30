from django.contrib import admin
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='MCFit/index.html')),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('index/', views.index, name = 'index'),
    path('account/register/', views.register, name = 'register'),
    path('account/login/', views.login, name = 'login'),
    path('logout/', views.logoutUser, name='logout'),
    path('exercise/', views.exercise, name = 'exercise'),
    path('forms/', views.forms, name = 'forms'),
]

urlpatterns += staticfiles_urlpatterns()
