from django.urls import path
from django.views.generic import TemplateView

app_name='mcfit'

urlpatterns = [
    path('',TemplateView.as_view(template_name="mcfit/index.html")),
]
