#!/usr/bin/env python
import os
import sys
import omdb
import requests
import re
import django

API_KEY = 'bacd95fe'
omdb.set_default('apikey', API_KEY)

#get top 250 movies from IMDB

top250_url = "http://akas.imdb.com/chart/top"
def get_top250():
    r = requests.get(top250_url)
    html = r.text.split("\n")
    result = []
    for line in html:
        line = line.rstrip("\n")
        m = re.search(r'data-titleid="tt(\d+?)">', line)
        if m:
            _id = m.group(1)
            result.append(_id)
    return result

top250 = get_top250()
movies = []
for i in range(100):
    movies.append(omdb.imdbid('tt'+top250[i]))

#save movie objects in django db

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "novelty.settings")
os.environ["DJANGO_SETTINGS_MODULE"] = "novelty.settings"
django.setup()

from movies.models import Movie

for movie in movies:
    m = Movie(
        title=movie.title,
        director=movie.director,
        genre=movie.genre,
        plot=movie.plot,
        poster=movie.poster,
        year=movie.year,
        imdb_id=movie.imdb_id,
        imdb_rating=movie.imdb_rating
        )
    m.save()
