# Generated by Django 5.1.4 on 2024-12-29 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0011_alter_task_user'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='task',
            constraint=models.UniqueConstraint(fields=('description', 'date_created'), name='Task_composite_primary_key'),
        ),
    ]
