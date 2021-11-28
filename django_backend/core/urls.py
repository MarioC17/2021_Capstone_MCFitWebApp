from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from rest_framework import routers 
route = routers.DefaultRouter()
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mcfit.urls',namespace='mcfit')),
    path('api/',include('mcfit_api.urls',namespace='mcfit_api')),
    
]
