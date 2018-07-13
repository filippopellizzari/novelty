import requests
import time

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

#get rate limit of tmdb server requests
def check_rate_limit():
    url = "https://api.themoviedb.org/3/movie/latest?api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"

    res = requests.request("GET", url)
    rate_limit = res.headers['X-RateLimit-Remaining']
    print(rate_limit)
    if(int(rate_limit)<10):
        print("waiting")
        time.sleep(2)
