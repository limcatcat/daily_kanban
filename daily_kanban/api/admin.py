from django.contrib import admin
from .models import Task

# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'description', 'status', 'date_created', 'date_assigned', 'date_done', 'archived')

    def get_user(self, obj):
        return obj.user.username
    get_user.short_description = 'User'

admin.site.register(Task, TaskAdmin)