from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from django.utils import timezone
from datetime import datetime, date
from django.db.models import Q


# Create your views here.
# def index(request, *args, **kwargs):
#     return render(request, "frontend/index.html")

class HomeView(TemplateView):
    template_name = "frontend/index.html"

class StatsView(TemplateView):
    template_name = "frontend/stats.html"

class TaskListAPIView(APIView):
    def get(self, request):
        
        selected_date = request.query_params.get('date')
        if not selected_date:
            selected_date = date.today()
        else:
            try:
                selected_date = datetime.strptime(selected_date, '%Y-%m-%d').date()
            except ValueError:
                return Response({'error': 'Invalid date format'}, status=status.HTTP_400_BAD_REQUEST)

        tasks = Task.objects.filter(
            Q(status='0') |
            Q(status='1', date_assigned__date__lte=selected_date) |
            Q(status='2', date_assigned__date__lte=selected_date) |
            Q(status='3', date_done__date=selected_date),
            archived=False)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        data = request.data
        data['status'] = data.get('status', '0')

        serializer = TaskSerializer(data=data)
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
        selected_date = request.data.get('date')


        if not isinstance(new_status, str) or new_status not in ['0', '1', '2', '3']:
            return Response({'error': 'Invalid status type or value'}, status=400)


        # scenario 1-1: Task is moved from Backlog to another column (Today/In Progress)
        if task.status == '0' and new_status in ['1', '2']:
            task.date_assigned = selected_date
            print(f'date_assigned: {task.date_assigned}')

        # scenario 1-2: Task is moved from Backlog to Done
        if task.status == '0' and new_status == '3':
            task.date_assigned = timezone.now()
            task.date_done = timezone.now()
            print(f'date_assigned: {task.date_assigned}, date_done: {task.date_done}')

        # scenario 3: Task is moved from Today/In Progress back to Backlog
        if task.status in ['1', '2'] and new_status == '0':
            task.date_assigned = None

        # scenario 4: Task is moved to Done or out of Done
        if task.status in ['1', '2'] and new_status == '3': # moved to Done
            task.date_done = timezone.now()
        elif task.status == '3' and new_status in ['0', '1', '2']: # moved out of Done
            if new_status in ['1', '2']:
                task.date_done = None
            else: # moved from Done to Backlog
                task.date_assigned = None 
                task.date_done = None

        print(f"Old task status: {task.status}, New task status: {new_status}")
        task.status = new_status

        task.save()

        print(f"Task ID: {task_id}, New status: {request.data.get('status')}")
        return Response({'message': 'Task status updated successfully'}, status=200)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=404)
    

@api_view(['PATCH'])
def update_task_description(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
        new_description = request.data.get('description')

        if not new_description or not isinstance(new_description, str):
            return Response({'error': 'Invalid description or empty string'}, status=400)

        task.description = new_description
        task.save()

        return Response({'message': 'Task description updated successfully'}, status=200)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=404)


@api_view(['PATCH'])
def delete_task(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
        task.archived = True
        task.save()
        return Response({'message': 'Task deleted successfully'}, status=200)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=404)    