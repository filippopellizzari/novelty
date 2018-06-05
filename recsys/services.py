from tmdbv3api import TMDb, Discover
import tmdbsimple as tmdb
import random

API_KEY = 'a070e12e1c6d7b84ebc1b172c841a8bf'

def get_movie_by_id(movie_id):
    tmdb.API_KEY = API_KEY
    try:
        response = tmdb.Movies(movie_id).info()
        return response
    except:
        pass
    return

#TODO
'''
def exclude_seen(response,selected_items):
    new_response = []
    for movie_id in selected_items:
        for movie in response:
            print(movie)
            print(movie_id)
    return response
'''

def top_pop():
    tmdb.API_KEY = API_KEY
    movies = tmdb.Movies()
    response = movies.popular()
    return movies.results

def top_rated():
    tmdb.API_KEY = API_KEY
    movies = tmdb.Movies()
    response = movies.top_rated()
    return movies.results

def top_pop_genre(selected_items):
    tmdb.API_KEY = API_KEY
    genres = []
    for movie_id in selected_items:
        movie = tmdb.Movies(movie_id).info()
        for genre in movie["genres"]:
            genres.append(genre["id"])
    #OR of genres
    genres = '|'.join(str(x) for x in genres)
    print(genres)

    TMDb().api_key = API_KEY
    discover = Discover()

    response = discover.discover_movies({
        'with_genres': genres,
        'sort_by': 'popularity.desc'
    })
    return response

def top_pop_crew(selected_items):
    tmdb.API_KEY = API_KEY
    crew_ids = []
    for movie_id in selected_items:
        credits = tmdb.Movies(movie_id).credits()
        for crew in credits["crew"][0:5]:
            crew_ids.append(crew["id"])
    #OR of crew
    crew_ids = '|'.join(str(x) for x in crew_ids)
    print(crew_ids)

    TMDb().api_key = API_KEY
    discover = Discover()
    response = discover.discover_movies({
        'with_crew': [crew_ids],
        'sort_by': 'popularity.desc'
    })
    #response = exclude_seen(response,selected_items)
    return response

def get_random(reclist_length):
    tmdb.API_KEY = API_KEY

    latest_id = tmdb.Movies().latest()["id"]
    random_ids = random.sample(range(1, latest_id), reclist_length*2)

    count = 0
    movies = []
    for movie_id in random_ids:
        movie = get_movie_by_id(movie_id)
        if(movie!=None):
            movies.append(get_movie_by_id(movie_id))
            count = count + 1
        if (count == reclist_length):
            break

    return movies


def recommend(selected_items, reclist_length):
    movies = top_pop_crew(selected_items)
    movies = movies[:reclist_length]
    return movies
