from django.urls import path
from .views import HomeView, StatsView, TaskListAPIView, update_task_status, update_task_description, delete_task, CustomAuthToken, LogoutAPIView

app_name = 'frontend'

urlpatterns = [
    # path('', index)
    path('', HomeView.as_view(), name='home'),
    path('statistics/', StatsView.as_view(), name='statistics'),
    path('tasks/', TaskListAPIView.as_view(), name='tasks'),
    path('tasks/<int:task_id>/update-status/', update_task_status, name='update_task_status'), # '/' at the end is also necessary!
    path('tasks/<int:task_id>/update-description/', update_task_description, name='update_task_description'),
    path('tasks/<int:task_id>/delete/', delete_task, name='delete_task'),
    path('api/login/', CustomAuthToken.as_view(), name='api_login'),
    path('api/logout/', LogoutAPIView.as_view(), name='api_logout')
]
