# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-06-07 19:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recsys', '0004_recommender_rec_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recommender',
            name='rec_id',
            field=models.IntegerField(null=True),
        ),
    ]