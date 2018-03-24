# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-13 18:04
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0041_auto_20180313_1751'),
    ]

    operations = [
        migrations.AddField(
            model_name='survey',
            name='survey_name',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
    ]