from django.urls import path
from .views import StatsView, StatsAPIView

app_name = 'stats'

urlpatterns = [
    path('', StatsView.as_view(), name='stats'),
    path('api/task-stats/', StatsAPIView.as_view(), name='task_stats'),
]
