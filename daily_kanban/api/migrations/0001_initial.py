# Generated by Django 5.1.4 on 2025-01-07 21:55

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=500)),
                ('status', models.CharField(choices=[('0', 'Backlog'), ('1', 'Today'), ('2', 'In Progress'), ('3', 'Done')], default='0', max_length=1)),
                ('date_created', models.DateTimeField()),
                ('date_assigned', models.DateTimeField(blank=True, null=True)),
                ('date_done', models.DateTimeField(blank=True, null=True)),
                ('archived', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='api_tasks', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'constraints': [models.UniqueConstraint(fields=('user', 'description', 'date_created'), name='Task_comp_primary_key')],
            },
        ),
    ]
