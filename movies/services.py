import tmdbsimple as tmdb
from urllib.parse import unquote

API_KEY = 'a070e12e1c6d7b84ebc1b172c841a8bf'

def get_movies_by_title(query,page):
    tmdb.API_KEY = API_KEY
    search = tmdb.Search()
    response = search.movie(query=query,page=page)
    return search.results

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
