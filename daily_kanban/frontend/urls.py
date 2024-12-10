from django.urls import path
from .views import HomeView, StatsView

app_name = 'frontend'

urlpatterns = [
    # path('', index)
    path('', HomeView.as_view(), name='home'),
    path('statistics', StatsView.as_view(), name='statistics')
]
