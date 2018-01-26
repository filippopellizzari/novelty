# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-01-22 16:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0009_auto_20180122_1603'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='option',
            name='question',
        ),
        migrations.AddField(
            model_name='question',
            name='options',
            field=models.ManyToManyField(to='surveys.Option'),
        ),
    ]