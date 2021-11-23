from django.urls import path
from django.urls.conf import include
from rest_framework import routers 




route = routers.DefaultRouter()
urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('', include('mcfit.urls',namespace='mcfit')),
    path('apis/',include('mcfit_api.urls',namespace='mcfit_api')),
    
]
