from django.shortcuts import render
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import get_authorization_header
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from api.models import Task
from api.serializers import TaskSerializer
from django.db.models import Count, Min, Max
from django.http import JsonResponse
from django.views.generic import TemplateView
from django.db.models.functions import TruncDate, ExtractIsoWeekDay
from django.utils import timezone
from math import ceil

# Create your views here.
class StatsView(TemplateView):
    template_name = 'index.html'


# helper function
def get_start_of_week():
    today = datetime.today().date()
    start_of_week = today - timedelta(days=today.weekday())
    return start_of_week


# helper function for counting weekday occurrence within a period
def count_weekday_occ(start_date, end_date, weekday):
    if start_date > end_date:
        return 1 # to avoid dividing with 0
    
    current_date = start_date
    while current_date.weekday() != weekday:
        current_date += timedelta(days=1)

    count = 0
    while current_date <= end_date:
        count += 1
        current_date += timedelta(days=7)

    if count == 0:
        return 1
    
    return count


class StatsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        # debugging
        # print("Entering StatsAPIView")

        try: # debugging
               
            auth_header = get_authorization_header(request).decode('utf-8')

            # debugging
            print(f"Auth header: {auth_header}")
        
        except Exception as e: # debugging
            print(f"Error decoding authorization header: {e}")
            return Response({'error': 'Malformed auth header'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        if auth_header and auth_header.startswith('Bearer '):
            token_key = auth_header.split(' ')[1]

            try:
                token = Token.objects.get(key=token_key)
                user = token.user
                # print(f'***USER IS: {user}***')

            except Token.DoesNotExist:
                return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
            
        else:
            return Response({'error': 'Authorization header missing or malformed'}, status=status.HTTP_409_CONFLICT)
        
        
        total_completed_tasks_count = Task.objects.filter(
            user=user,
            archived=False,
            status='3').count()
        


        # 1. the most productive day of this week
        start_of_week = get_start_of_week()
        tasks_completed_this_week = Task.objects.filter(
            user=user,
            status='3',
            date_done__gte=start_of_week
        ).annotate(date_done_date=TruncDate('date_done')).values('date_done_date').annotate(completed_count=Count('id')).order_by('-completed_count')

        # tasks_completed_this_week = list(tasks_completed_this_week)
        
        print(f'tasks_completed_this_week: {tasks_completed_this_week}')

        if tasks_completed_this_week:
            most_productive_day_this_week = {
                'date': tasks_completed_this_week[0]['date_done_date'],
                'day': tasks_completed_this_week[0]['date_done_date'].strftime('%A'),
                'count': tasks_completed_this_week[0]['completed_count']
            }
        else:
            most_productive_day_this_week= {'date': 'none', 'day': 'none', 'count': 0}



        # 2. the most productive day of the week (average tasks completed on each weekday)
            # get the earliest date done
        earliest_date = Task.objects.filter(user=user, archived=False, status='3').aggregate(Min('date_done'))['date_done__min']

            # calculate the number of weeks since the earliest date in date_done
        today = timezone.now().date()

        if earliest_date:
            number_of_weeks = (today - earliest_date.date()).days // 7 # number of complete weeks (integer division)
            if number_of_weeks == 0:
                number_of_weeks = 1
        else:
            number_of_weeks = 1

        # print(f'number of weeks: {number_of_weeks}')
        # print(f'weekday of today: {today.weekday()}')

        weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

        completed_by_weekday = Task.objects.filter(user=user, archived=False, status='3').annotate(weekday=ExtractIsoWeekDay('date_done')
        ).values('weekday').annotate(completed_count=Count('id')).order_by('weekday')

        avg_completed_by_weekday = []

        for i, weekday in enumerate(weekdays):
            total_completed = sum(task['completed_count'] for task in completed_by_weekday if task['weekday'] == i + 1)

            average = round((total_completed / count_weekday_occ(earliest_date.date(), today, i)), 2)

            avg_completed_by_weekday.append({
                'weekday': weekday,
                'completed_avg': average
            })

        for entry in avg_completed_by_weekday:
            print(f"{entry['weekday']}: {entry['completed_avg']:.2f} tasks/week")

        avg_completed_by_weekday.sort(key=lambda x: x['completed_avg'], reverse=True)

        if avg_completed_by_weekday[0]['completed_avg'] != 0:
            most_productive_day_overall = {
                'weekday': avg_completed_by_weekday[0]['weekday'],
                'count': avg_completed_by_weekday[0]['completed_avg']
            }
        else:
            most_productive_day_overall = {
            'weekday': 'none',
            'count': 0
            }


        # 3. the average number of completed tasks per day
        if earliest_date:
            if earliest_date.date() > today:
                latest_date = Task.objects.filter(user=user, archived=False, status='3').aggregate(Max('date_done'))['date_done__max']
                number_of_days = (latest_date.date() - earliest_date.date()).days + 1
            else:
                number_of_days = (today - earliest_date.date()).days + 1
        else:
            number_of_days = 1

        avg_per_day = round(total_completed_tasks_count / number_of_days, 2)

        print(f'number of days: {number_of_days}, avg per day: {avg_per_day}')


        # 4. the percentage of unfinished tasks
        total_tasks_count = Task.objects.filter(user=user, archived=False).count()
        
        if total_tasks_count > 0:
            completed_percentage = round((total_completed_tasks_count / total_tasks_count) * 100, 2)
        else:
            completed_percentage = 0


        # results
        stats = {
            'total_completed': total_completed_tasks_count,
            'most_productive_day_this_week': most_productive_day_this_week,
            'most_productive_day_overall': most_productive_day_overall,
            'average_completed_tasks_per_day': avg_per_day,
            'completed_percentage': completed_percentage
        }

        # # debugging
        # stats = {
        #     'total_completed': 1,
        #     'most_productive_day_this_week': {'date': '1', 'count': 1},
        #     'most_productive_day_overall': {'weekday': '1', 'count': 0},
        #     'average_completed_tasks_per_day': 1,
        #     'completed_percentage': 1
        # }

        return JsonResponse(stats)
