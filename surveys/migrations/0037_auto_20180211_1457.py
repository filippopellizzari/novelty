# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-02-11 14:57
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0036_auto_20180204_2303'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='surveyresponse',
            name='survey_id',
        ),
        migrations.AddField(
            model_name='surveyresponse',
            name='survey',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='surveys.Survey'),
            preserve_default=False,
        ),
    ]