from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mcfit.urls',namespace='mcfit')),
    path('api/',include('mcfit_api.urls',namespace='blog_api')),
    
]
