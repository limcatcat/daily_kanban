from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from django.utils import timezone


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
        # task.status = request.data.get('status')

        new_status = request.data.get('status')


        if not isinstance(new_status, str) or new_status not in ['0', '1', '2', '3']:
            return Response({'error': 'Invalid status type or value'}, status=400)


        # # scenario 1: Task is created in Backlog <- implement later after adding Task add functionality
        # if new_status == '0' and task.status != '0':
        #     task.date_created = timezone.now()

        # scenario 2-1: Task is moved from Backlog to another column (Today/In Progress)
        if task.status == '0' and new_status in ['1', '2']:
            task.date_assigned = timezone.now()
            print(f'date_assigned: {task.date_assigned}')

        # scenario 2-2: Task is moved from Backlog to Done
        if task.status == '0' and new_status == '3':
            task.date_assigned = timezone.now()
            task.date_done = timezone.now()
            print(f'date_assigned: {task.date_assigned}, date_done: {task.date_done}')

        # scenario 3: Task is moved to the next day <- implement later
        # date_moved


        # scenario 4: Task is moved to Done or out of Done
        if task.status in ['1', '2'] and new_status == '3': # moved to Done
            task.date_done = timezone.now()
        elif task.status == '3' and new_status in ['0', '1', '2']: # moved out of Done
            task.date_done = None

        print(f"Old task status: {task.status}, New task status: {new_status}")
        task.status = new_status

        task.save()

        print(f"Task ID: {task_id}, New status: {request.data.get('status')}")
        return Response({'message': 'Task status updated successfully'}, status=200)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=404)