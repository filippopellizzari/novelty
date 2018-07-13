import tmdbsimple as tmdb
import requests
import time
from .utils import exclude_seen

API_KEY = 'a070e12e1c6d7b84ebc1b172c841a8bf'

class Top_Pop_Recommender:

    def __init__(self, selected_items, reclist_length, genre=False, crew=False, cast=False):
        self.selected_items = selected_items
        self.reclist_length = reclist_length
        self.genre = genre
        self.crew = crew
        self.cast = cast

    def get_top_pop(self, ncrew=1, ncast=1):
        tmdb.API_KEY = API_KEY
        genres_ids = []
        crew_ids = []
        cast_ids = []
        if(self.genre):
            for movie_id in self.selected_items:
                movie = tmdb.Movies(movie_id).info()
                for genre in movie["genres"]:
                    genres_ids.append(genre["id"])
            genres_ids = '|'.join(str(x) for x in genres_ids)
        if(self.crew):
            for movie_id in self.selected_items:
                credits = tmdb.Movies(movie_id).credits()
                for crew in credits["crew"][0:ncrew]:
                    crew_ids.append(crew["id"])
            crew_ids = '|'.join(str(x) for x in crew_ids)
        if(self.cast):
            for movie_id in self.selected_items:
                credits = tmdb.Movies(movie_id).credits()
                for cast in credits["cast"][0:ncast]:
                    cast_ids.append(cast["id"])
            cast_ids = '|'.join(str(x) for x in cast_ids)

        discover = tmdb.Discover()
        response = discover.movie(
            with_genres=[genres_ids],
            with_crew=[crew_ids],
            with_cast=[cast_ids],
            sort_by='popularity.desc'
        )

        response = exclude_seen(discover.results, self.selected_items)
        return response

    def get_movies(self):
        ncrew = 10
        ncast = 10
        movies = self.get_top_pop(ncrew, ncast)
        '''
        while(len(movies)<self.reclist_length):
            print("top_pop_movies: " +str(len(movies)))
            ncrew = ncrew + 5
            ncast = ncast + 5
            movies = movies + new_movies(movies,self.get_top_pop(ncrew, ncast))
        '''
        movies = movies[:self.reclist_length]
        return movies
