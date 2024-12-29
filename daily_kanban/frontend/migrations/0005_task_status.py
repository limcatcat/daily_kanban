# Generated by Django 5.1.4 on 2024-12-28 01:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0004_remove_task_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.IntegerField(choices=[(0, 'Backlog'), (1, 'Today'), (2, 'In Progress'), (3, 'Done')], default=0),
        ),
    ]
