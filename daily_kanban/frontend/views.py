from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
# def index(request, *args, **kwargs):
#     return render(request, "frontend/index.html")

class HomeView(TemplateView):
    template_name = "frontend/index.html"