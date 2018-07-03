import tmdbsimple as tmdb
import random
import requests
import time

API_KEY = 'a070e12e1c6d7b84ebc1b172c841a8bf'

def get_movie_by_id(movie_id):
    tmdb.API_KEY = API_KEY
    try:
        response = tmdb.Movies(movie_id).info()
        return response
    except:
        pass
    return

#remove selected items from movie response
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

#if there are new items of movies2 different from movies1, return them
def new_movies(movies1, movies2):
    new_movies = []
    for movie2 in movies2:
        already_taken = False
        for movie1 in movies1:
            if movie1 == movie2:
                already_taken = True
        if (already_taken==False):
            new_movies.append(movie2)
    return new_movies

def top_rated_algo(selected_items):
    tmdb.API_KEY = API_KEY
    movies = tmdb.Movies()
    response = movies.top_rated()
    #time.sleep(1)
    response = exclude_seen(movies.results, selected_items)
    return response

def get_top_pop_movies(selected_items, genre=False, crew=False, cast=False, ncrew=1, ncast=1):
    tmdb.API_KEY = API_KEY
    genres_ids = []
    crew_ids = []
    cast_ids = []
    if(genre):
        for movie_id in selected_items:
            movie = tmdb.Movies(movie_id).info()
            #time.sleep(1)
            for genre in movie["genres"]:
                genres_ids.append(genre["id"])
        #OR of genres
        genres_ids = '|'.join(str(x) for x in genres_ids)
        #print("top_pop genres: " + genres_ids)
    if(crew):
        for movie_id in selected_items:
            credits = tmdb.Movies(movie_id).credits()
            #time.sleep(1)
            for crew in credits["crew"][0:ncrew]:
                crew_ids.append(crew["id"])
        #OR of crew
        crew_ids = '|'.join(str(x) for x in crew_ids)
        #print("top_pop crew_ids: " + crew_ids)
    if(cast):
        for movie_id in selected_items:
            credits = tmdb.Movies(movie_id).credits()
            #time.sleep(1)
            for cast in credits["cast"][0:ncast]:
                cast_ids.append(cast["id"])
        #OR of cast
        cast_ids = '|'.join(str(x) for x in cast_ids)
        #print("top_pop cast_ids: " + cast_ids)
    discover = tmdb.Discover()
    response = discover.movie(
        with_genres=[genres_ids],
        with_crew=[crew_ids],
        with_cast=[cast_ids],
        sort_by='popularity.desc'
    )
    #time.sleep(1)
    response = exclude_seen(discover.results, selected_items)
    return response

def top_pop_algo(selected_items, reclist_length, genre=False, crew=False, cast=False):
    ncrew = 10
    ncast = 10
    movies = get_top_pop_movies(selected_items, genre, crew, cast, ncrew, ncast)
    '''
    while(len(movies)<reclist_length):
        print("top_pop_movies: " +str(len(movies)))
        ncrew = ncrew + 5
        ncast = ncast + 5
        movies = movies + new_movies(movies,get_top_pop_movies(selected_items, genre, crew, cast, ncrew, ncast))
    '''
    print("top_pop_movies: " +str(len(movies)))
    return movies

def get_random_movies(selected_items, reclist_length, genre=False, crew=False, cast=False, ncrew=1, ncast=1):
    tmdb.API_KEY = API_KEY

    genres_ids = []
    crew_ids = []
    cast_ids = []
    if(genre):
        for movie_id in selected_items:
            movie = tmdb.Movies(movie_id).info()
            #time.sleep(1)
            for genre in movie["genres"]:
                genres_ids.append(genre["id"])
        #OR of genres
        genres_ids = '|'.join(str(x) for x in genres_ids)
        #print("random genres: " + genres_ids)
    if(crew):
        for movie_id in selected_items:
            credits = tmdb.Movies(movie_id).credits()
            #time.sleep(1)
            for crew in credits["crew"][0:ncrew]:
                crew_ids.append(crew["id"])
        #OR of crew
        crew_ids = '|'.join(str(x) for x in crew_ids)
        #print("random crew_ids: " + crew_ids)
    if(cast):
        for movie_id in selected_items:
            credits = tmdb.Movies(movie_id).credits()
            #time.sleep(1)
            for cast in credits["cast"][0:ncast]:
                cast_ids.append(cast["id"])
        #OR of cast
        cast_ids = '|'.join(str(x) for x in cast_ids)
        #print("random cast_ids: " + cast_ids)


    discover = tmdb.Discover()
    response = discover.movie(
        with_genres=[genres_ids],
        with_crew=[crew_ids],
        with_cast=[cast_ids]
    )
    #time.sleep(1)

    #this is due to a tmdb bug!!
    if(discover.total_pages > 1000):
        latest_page=1000
    else:
        latest_page=discover.total_pages
    if(discover.total_results<reclist_length):
        max_length=discover.total_results
    else:
        max_length=reclist_length

    movies = []
    count = 0
    while(count < max_length):
        random_page = random.randint(1,latest_page)
        response = discover.movie(
            with_genres=[genres_ids],
            with_crew=[crew_ids],
            with_cast=[cast_ids],
            page=random_page
        )
        #time.sleep(1)
        random_movie = discover.results[random.randint(0,len(discover.results)-1)]
        already_selected=False
        for movie in movies:
            if(movie["id"]==random_movie["id"]):
                already_selected=True
        if(already_selected==False):
            movies.append(random_movie)
            count = count + 1

    response = exclude_seen(movies, selected_items)
    return response

def random_algo(selected_items, reclist_length, genre=False, crew=False, cast=False):
    ncrew = 20
    ncast = 20
    movies = get_random_movies(selected_items, reclist_length,genre, crew, cast, ncrew, ncast)
    '''
    while(len(movies)<reclist_length):
        print("random_movies: " +str(len(movies)))
        ncrew = ncrew + 7
        ncast = ncast + 7
        movies = movies + new_movies(movies,get_random_movies(selected_items,
                                    reclist_length,genre, crew, cast, ncrew, ncast))
    '''
    print("random_movies: " +str(len(movies)))
    return movies

def recommend(algorithm, selected_items, reclist_length):
    rec_name = algorithm.get("rec_name")
    if(rec_name=="top_pop"):
        print("TOP_POP")
        movies = top_pop_algo(
            selected_items,
            reclist_length,
            genre=algorithm.get("genre"),
            crew=algorithm.get("crew"),
            cast=algorithm.get("cast")
            )
    elif(rec_name=="top_rated"):
        print("TOP_RATED")
        movies = top_rated_algo(selected_items)
    elif(rec_name=="random"):
        print("RANDOM")
        movies = random_algo(
            selected_items,
            reclist_length,
            genre=algorithm.get("genre"),
            crew=algorithm.get("crew"),
            cast=algorithm.get("cast")
            )

    movies = movies[:reclist_length]
    return movies
