# Generated by Django 5.1.4 on 2024-12-28 01:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0002_alter_task_date_assigned_alter_task_date_done_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('0', 'Backlog'), ('1', 'Today'), ('2', 'In Progress'), ('3', 'Done')], default='0', max_length=1),
        ),
    ]
