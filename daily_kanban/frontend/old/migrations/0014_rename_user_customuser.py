# Generated by Django 5.1.4 on 2025-01-01 18:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0013_alter_task_date_created_alter_user_email'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='CustomUser',
        ),
    ]
