from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer


# Create your views here.
# def index(request, *args, **kwargs):
#     return render(request, "frontend/index.html")

class HomeView(TemplateView):
    template_name = "frontend/index.html"

class StatsView(TemplateView):
    template_name = "frontend/stats.html"

class TaskListAPIView(APIView):
    def get(self, reqeust):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PATCH'])
def update_task_status(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
        task.status = request.data.get('status')
        task.save()

        print(f"Task ID: {task_id}, New status: {request.data.get('status')}")
        return Response({'message': 'Task status updated successfully'}, status=200)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=404)