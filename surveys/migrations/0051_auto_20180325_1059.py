# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-25 10:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0050_auto_20180325_1057'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='option',
            name='id',
        ),
        migrations.AlterField(
            model_name='option',
            name='option_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]