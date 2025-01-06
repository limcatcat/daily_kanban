from django.db import models
from django.db.models import UniqueConstraint
from django.contrib.auth.models import User
# from django.contrib.auth.models import AbstractUser
# from django.contrib.auth.hashers import make_password

# Create your models here.

# class CustomUser(AbstractUser):
#     username = models.CharField(unique=True, primary_key=True, max_length=30)
#     password = models.CharField(max_length=128)
#     email = models.EmailField(unique=True)
#     date_created = models.DateTimeField()
#     date_updated = models.DateTimeField(null=True, blank=True)

#     def set_password(self, raw_password):
#         self.password = make_password(raw_password)

#     def check_password(self, raw_password):
#         from django.contrib.auth.hashers import check_password
#         return check_password(raw_password, self.password)
    
#     def save(self, *args, **kwargs):
#         if self.password:
#             self.password = make_password(self.password)
#         super().save(*args, **kwargs)


class Task(models.Model):
    
    STATUS_CHOICES = (
        ('0', 'Backlog'),
        ('1', 'Today'),
        ('2', 'In Progress'),
        ('3', 'Done')
    )
    

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=500)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='0')
    date_created = models.DateTimeField()
    date_assigned = models.DateTimeField(null=True, blank=True)
    date_done = models.DateTimeField(null=True, blank=True)
    archived = models.BooleanField(default=False)


    class Meta:
        constraints = [
            UniqueConstraint(fields=['description', 'date_created'], name='Task_composite_primary_key')
        ]

    def __str__(self):
        return f'user: {self.user}, status: {self.status}, date_done: {self.date_done}'