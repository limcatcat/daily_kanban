from django.db import models
from django.db.models import UniqueConstraint
from django.contrib.auth.models import User

class Task(models.Model):
    
    STATUS_CHOICES = (
        ('0', 'Backlog'),
        ('1', 'Today'),
        ('2', 'In Progress'),
        ('3', 'Done')
    )
    

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='api_tasks')
    description = models.CharField(max_length=500)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='0')
    date_created = models.DateTimeField()
    date_assigned = models.DateTimeField(null=True, blank=True)
    date_done = models.DateTimeField(null=True, blank=True)
    archived = models.BooleanField(default=False)


    class Meta:
        constraints = [
            UniqueConstraint(fields=['description', 'date_created'], name='Task_comp_primary_key')
        ]

    def __str__(self):
        return f'user: {self.user}, description: {self.description}, status: {self.status}, date_done: {self.date_done}'