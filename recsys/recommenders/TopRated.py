import tmdbsimple as tmdb
import time
from .utils import exclude_seen, check_rate_limit

API_KEY = 'a070e12e1c6d7b84ebc1b172c841a8bf'

class Top_Rated_Recommender:

    def __init__(self, selected_items, reclist_length):
        self.selected_items = selected_items
        self.reclist_length = reclist_length

    def get_movies(self):
        tmdb.API_KEY = API_KEY
        movies = tmdb.Movies()
        response = movies.top_rated()
        check_rate_limit()

        response = exclude_seen(movies.results, self.selected_items)
        movies = response[:self.reclist_length]
        return movies
