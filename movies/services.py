import tmdbsimple as tmdb
from urllib.parse import unquote
import json
import requests

API_KEY = 'a070e12e1c6d7b84ebc1b172c841a8bf'

def filter_release_date_lt(results, year):
    movies = []
    for x in results:
        if(x["release_date"][:4]!=''):
            if(int(x["release_date"][:4])<=year):
                movies.append(x)
    return movies


def get_movies_by_title(query,page):
    tmdb.API_KEY = API_KEY
    search = tmdb.Search()
    response = search.movie(query=query,page=page)
    movies = filter_release_date_lt(search.results, 2018)
    return movies


def get_movie_by_id(movie_id):
    tmdb.API_KEY = API_KEY
    try:
        response = tmdb.Movies(movie_id).info()
        return response
    except:
        pass
    return

def get_total_results(query):
    tmdb.API_KEY = API_KEY
    search = tmdb.Search()
    response = search.movie(query=query)
    return search.total_results

def get_popular_movies(page):
    tmdb.API_KEY = API_KEY
    movies = tmdb.Movies()
    response = movies.popular(page=page)
    return movies.results
