from django.urls import path
from .views import StatsView, StatsAPIView
from django.http import JsonResponse

app_name = 'stats'

def debug_view(request):
    auth_header = request.headers.get('Authorization', 'No Authorization header')
    return JsonResponse({'message': 'Debug: URL reached', 'Authorization': auth_header})

urlpatterns = [
    path('', StatsView.as_view(), name='stats'),
    # path('api/task-stats/', StatsAPIView.as_view(), name='task_stats'),
    path('api/task-stats/', StatsAPIView.as_view(), name='task_stats'),
]
