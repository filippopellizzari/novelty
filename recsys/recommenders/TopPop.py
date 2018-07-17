import requests
from .utils import exclude_seen, check_rate_limit, new_movies
from .content import get_genres_ids, get_crew_cast_ids

class Top_Pop_Recommender:

    def __init__(self, selected_items, reclist_length,genre=False, crew=False, cast=False):
        self.selected_items = selected_items
        self.reclist_length = reclist_length
        self.genre = genre
        self.crew = crew
        self.cast = cast

    def get_content(self):
        ncrew = 2
        ncast = 2
        if(self.genre):
            self.genres_ids = get_genres_ids(self.selected_items)
        self.crew_ids, self.cast_ids = get_crew_cast_ids(self.selected_items, ncrew, ncast)

    def get_top_pop(self):

        url = "https://api.themoviedb.org/3/discover/movie?"\
        "api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"\
        "&sort_by=popularity.desc&include_adult=false&page=1"
        if(self.genre):
            url += "&with_genres="+self.genres_ids
        if(self.crew):
            url += "&with_crew="+self.crew_ids
            print(self.crew_ids)
        if(self.cast):
            url += "&with_cast="+self.cast_ids
            print(self.cast_ids)
        r = requests.get(url)
        check_rate_limit(r)
        results = r.json()["results"]

        response = exclude_seen(results, self.selected_items)
        return response

    def get_movies(self):
        self.get_content()
        movies = self.get_top_pop()
        while(len(movies)<self.reclist_length):
            print("top_pop_movies: " +str(len(movies)))
            self.cast = False
            self.crew = False
            movies = movies + new_movies(movies,self.get_top_pop())
        print("top_pop_movies: " +str(len(movies)))
        movies = movies[:self.reclist_length]
        return movies
