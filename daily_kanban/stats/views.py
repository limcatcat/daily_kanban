from django.shortcuts import render
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import get_authorization_header
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from frontend.models import Task
from frontend.serializers import TaskSerializer
from django.db.models import Count, Func
from django.http import JsonResponse
from django.views.generic import TemplateView

# Create your views here.
class StatsView(TemplateView):
    template_name = 'frontend/index.html'


# helper function
def get_start_of_week():
    today = datetime.today()
    start_of_week = today - timedelta(days=today.weekday())
    return start_of_week

# for weekday extraction
class Weekday(Func):
    function = 'strftime'
    template = "%(function)s('%w', %(expressions)s)"
    arity = 1


class StatsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        auth_header = get_authorization_header(request).decode('utf-8')

        if auth_header and auth_header.startswith('Bearer '):
            token_key = auth_header.split(' ')[1]

            try:
                token = Token.objects.get(key=token_key)
                user = token.user
            except Token.DoesNotExist:
                return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
            
        else:
            return Response({'error': 'Authorization header missing or malformed'}, status=status.HTTP_401_UNAUTHORIZED)
        
        
        total_completed_tasks = Task.objects.filter(
            user=user,
            archived=False,
            status='3').count()
        

        # the most productive day of this week
        start_of_week = get_start_of_week()
        tasks_completed_this_week = list(Task.objects.filter(
            user=user,
            status='3',
            date_done__gte=start_of_week
        ).values('date_done').annotate(completed_count=Count('id')).order_by('-completed_count'))

        most_productive_day_this_week = tasks_completed_this_week[0] if tasks_completed_this_week else None


        # # the most productive day of the week (average tasks completed on each weekday)
        # completed_by_weekday = Task.objects.filter(user=user, archived=False, status='3').annotate(
        #     weekday=Weekday('date_done')
        # ).values('weekday').annotate(completed_count=Count('id')).order_by('-completed_count')

        # most_productive_day_overall = completed_by_weekday[0] if completed_by_weekday else None


        # the average number of completed tasks per day
        # completed_tasks_per_day = Task.objects.filter(user=user, status='3').values('date_done').annotate(completed_count=Count('id'))
        # total_completed_days = len(completed_tasks_per_day)
        # average_completed_tasks_per_day = total_completed_tasks / total_completed_days if total_completed_days else 0


        # # the percentage of unfinished tasks
        # total_tasks = Task.objects.filter(user=user, archived=False).count()
        # unfinished_tasks = Task.objects.filter(
        #     user=user, 
        #     status__in=['0', '1', '2']
        # ).count()
        
        # if total_tasks > 0:
        #     unfinished_percentage = (unfinished_tasks / total_tasks) * 100
        #     completed_percentage = (total_completed_tasks / total_tasks) * 100
        # else:
        #     unfinished_percentage = 0
        #     completed_percentage = 0


        # results
        stats = {
            'total_completed': total_completed_tasks,
            'most_productive_day_this_week': most_productive_day_this_week,
            # 'most_productive_day_overall': most_productive_day_overall,
            # 'average_completed_tasks_per_day': average_completed_tasks_per_day,
            # 'unfinished_percentage': unfinished_percentage,
            # 'completed_percentage': completed_percentage
        }

        return JsonResponse(stats)


