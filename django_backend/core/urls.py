from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from rest_framework import routers 
from social_login.views import GoogleLogin

route = routers.DefaultRouter()
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mcfit.urls',namespace='mcfit')),
    path('api/',include('mcfit_api.urls',namespace='mcfit_api')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login')
]
