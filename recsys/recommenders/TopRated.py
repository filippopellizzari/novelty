import requests
from .utils import exclude_seen, check_rate_limit


class Top_Rated_Recommender:

    def __init__(self, selected_items, reclist_length):
        self.selected_items = selected_items
        self.reclist_length = reclist_length

    def get_movies(self):
        url = "https://api.themoviedb.org/3/movie/top_rated?api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US&page=1"
        r = requests.get(url)
        check_rate_limit(r)
        results = r.json()["results"]
        response = exclude_seen(results, self.selected_items)
        movies = response[:self.reclist_length]
        log = ""
        return movies,log
