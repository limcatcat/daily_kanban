# Generated by Django 5.1.4 on 2024-12-29 18:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0009_alter_task_user'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='task',
            name='Task_composite_primary_key',
        ),
    ]
