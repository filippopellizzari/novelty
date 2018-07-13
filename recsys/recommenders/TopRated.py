import tmdbsimple as tmdb
import requests
import time
from .utils import exclude_seen

API_KEY = 'a070e12e1c6d7b84ebc1b172c841a8bf'

class Top_Rated_Recommender:

    def __init__(self, selected_items, reclist_length):
        self.selected_items = selected_items
        self.reclist_length = reclist_length

    def get_movies(self):
        tmdb.API_KEY = API_KEY
        movies = tmdb.Movies()
        response = movies.top_rated()
        response = exclude_seen(movies.results, self.selected_items)
        '''
        for i in range(40):
            url = "https://api.themoviedb.org/3/movie/top_rated?page=1&language=en-US&api_key=a070e12e1c6d7b84ebc1b172c841a8bf"
            res = requests.request("GET", url)
            rate_limit = res.headers['X-RateLimit-Remaining']
            print(rate_limit)
            if(int(rate_limit) < 10):
                time.sleep(1)
        '''
        movies = response[:self.reclist_length]
        return movies
