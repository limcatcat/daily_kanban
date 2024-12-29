from django.urls import path
from .views import HomeView, StatsView, TaskListAPIView, update_task_status, update_task_description

app_name = 'frontend'

urlpatterns = [
    # path('', index)
    path('', HomeView.as_view(), name='home'),
    path('statistics', StatsView.as_view(), name='statistics'),
    path('tasks', TaskListAPIView.as_view(), name='tasks'),
    path('tasks/<int:task_id>/update-status/', update_task_status, name='update-task-status'),
    path('tasks/<int:task_id>/update-description/', update_task_description, name='update-task-description')
]
