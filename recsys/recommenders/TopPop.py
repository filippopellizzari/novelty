import requests
from .utils import exclude_seen, check_rate_limit, new_movies
from .content import get_genres_ids, get_crew_ids, get_cast_ids

class Top_Pop_Recommender:

    def __init__(self, algorithm, content, selected_items, reclist_length):
        self.genre = algorithm.get("genre")
        self.crew = algorithm.get("crew")
        self.cast = algorithm.get("cast")
        self.content = content
        self.selected_items = selected_items
        self.reclist_length = reclist_length


    def get_content(self):
        ngenres = 2
        ncrew = 5
        ncast = 5

        if(self.genre):
            self.genres_ids = get_genres_ids(self.content["genres"], ngenres)
            #print("top_pop_genres_ids: " + self.genres_ids)
        if(self.crew):
            self.crew_ids = get_crew_ids(self.content["crew"], ncrew)
            print("top_pop_crew_ids: " + self.crew_ids)
        if(self.cast):
            self.cast_ids = get_cast_ids(self.content["cast"], ncast)
            #print("top_pop_cast_ids: " + self.cast_ids)

    def get_top_pop(self):

        url = "https://api.themoviedb.org/3/discover/movie?"\
        "api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"\
        "&sort_by=popularity.desc&include_adult=false&page=1"\
        "&release_date.lte=2019"
        if(self.genre):
            url += "&with_genres="+self.genres_ids
        if(self.crew):
            url += "&with_crew="+self.crew_ids
        if(self.cast):
            url += "&with_cast="+self.cast_ids
        r = requests.get(url)
        check_rate_limit(r)
        results = r.json()["results"]

        response = exclude_seen(results, self.selected_items)
        return response

    def get_movies(self):
        self.get_content()
        movies = self.get_top_pop()
        if(len(movies)<self.reclist_length):
            print("top_pop_movies: " +str(len(movies)))
            self.crew = False
            self.cast = False
            movies = movies + new_movies(movies,self.get_top_pop())
        if(len(movies)<self.reclist_length):
            print("top_pop_movies: " +str(len(movies)))
            self.genre = False
            movies = movies + new_movies(movies,self.get_top_pop())
        print("top_pop_movies: " +str(len(movies)))
        movies = movies[:self.reclist_length]
        return movies
