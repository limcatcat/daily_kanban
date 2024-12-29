from django.contrib import admin
from .models import User, Task

# Register your models here.
admin.site.register(User)

class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'status', 'date_created', 'date_assigned', 'date_done', 'archived')
admin.site.register(Task, TaskAdmin)
