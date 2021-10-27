from django.contrib import admin
from django.urls import path, include

import MCFit

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('MCFit.urls')),
    path('accounts/', include('allauth.urls')),
]
