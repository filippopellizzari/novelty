import tmdbsimple as tmdb
import random
import requests

API_KEY = 'a070e12e1c6d7b84ebc1b172c841a8bf'

def get_movie_by_id(movie_id):
    tmdb.API_KEY = API_KEY
    try:
        response = tmdb.Movies(movie_id).info()
        return response
    except:
        pass
    return


def exclude_seen(response,selected_items):
    new_response = []
    for movie in response:
        already_seen = False
        for movie_id in selected_items:
            if(movie["id"]==movie_id):
                already_seen = True
        if(already_seen==False):
            new_response.append(movie)
    return new_response

def top_rated(selected_items):
    tmdb.API_KEY = API_KEY
    movies = tmdb.Movies()
    response = movies.top_rated()
    response = exclude_seen(movies.results, selected_items)
    return response

def top_pop(selected_items, genres_flag=False, crew_flag=False):
    tmdb.API_KEY = API_KEY
    genres = []
    crew_ids = []

    if(genres_flag):
        for movie_id in selected_items:
            movie = tmdb.Movies(movie_id).info()
            for genre in movie["genres"]:
                genres.append(genre["id"])
        #OR of genres
        genres = '|'.join(str(x) for x in genres)
        print("genres: " + genres)
    if(crew_flag):
        for movie_id in selected_items:
            credits = tmdb.Movies(movie_id).credits()
            for crew in credits["crew"][0:5]:
                crew_ids.append(crew["id"])
        #OR of crew
        crew_ids = '|'.join(str(x) for x in crew_ids)
        print("crew_ids: " + crew_ids)

    discover = tmdb.Discover()
    response = discover.movie(
        with_genres=[genres],
        with_crew=[crew_ids],
        sort_by='popularity.desc'
    )
    response = exclude_seen(discover.results, selected_items)
    return response

def get_random(selected_items,reclist_length):
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

    response = exclude_seen(movies, selected_items)
    return response


def recommend(selected_items, reclist_length):
    movies = top_pop(selected_items, genres_flag=False, crew_flag=True)
    #movies = top_rated(selected_items)
    #movies = get_random(selected_items,reclist_length)

    movies = movies[:reclist_length]
    return movies
