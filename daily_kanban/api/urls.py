from django.urls import path
from .views import TaskListAPIView, update_task_status, update_task_description, delete_task, get_nav_urls, RegisterAPIView, VerifyTokenAPIView, sync_token

app_name = 'api'

urlpatterns = [
    # path('', index)
    # path('', HomeView.as_view(), name='home'),
    # path('statistics/', StatsView.as_view(), name='statistics'),
    path('tasks/', TaskListAPIView.as_view(), name='tasks'),
    path('tasks/<int:task_id>/update-status/', update_task_status, name='update_task_status'), # '/' at the end is also necessary!
    path('tasks/<int:task_id>/update-description/', update_task_description, name='update_task_description'),
    path('tasks/<int:task_id>/delete/', delete_task, name='delete_task'),
    path('nav-urls/', get_nav_urls, name='nav_urls'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('auth/verify-token/', VerifyTokenAPIView.as_view(), name='verify_token'),
    path('auth/sync-token/', sync_token, name='sync_token'),
]
