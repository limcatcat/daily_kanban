from django.urls import path
from .views import HomeView

urlpatterns = [
    # path('', index)
    path('', HomeView.as_view(), name='home'),
]
