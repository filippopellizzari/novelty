import tmdbsimple as tmdb
import random
import time
from .utils import exclude_seen, check_rate_limit, new_movies

API_KEY = 'a070e12e1c6d7b84ebc1b172c841a8bf'


class Random_Recommender:

    def __init__(self, selected_items, reclist_length, genre=False, crew=False, cast=False):
        self.selected_items = selected_items
        self.reclist_length = reclist_length
        self.genre = genre
        self.crew = crew
        self.cast = cast

    def get_random(self, ncrew=1, ncast=1):
        tmdb.API_KEY = API_KEY
        genres_ids = []
        crew_ids = []
        cast_ids = []
        if(self.genre):
            for movie_id in self.selected_items:
                movie = tmdb.Movies(movie_id).info()
                check_rate_limit()
                for genre in movie["genres"]:
                    genres_ids.append(genre["id"])
            genres_ids = '|'.join(str(x) for x in genres_ids)
        if(self.crew):
            for movie_id in self.selected_items:
                credits = tmdb.Movies(movie_id).credits()
                check_rate_limit()
                for crew in credits["crew"][0:ncrew]:
                    crew_ids.append(crew["id"])
            crew_ids = '|'.join(str(x) for x in crew_ids)
        if(self.cast):
            for movie_id in self.selected_items:
                credits = tmdb.Movies(movie_id).credits()
                check_rate_limit()
                for cast in credits["cast"][0:ncast]:
                    cast_ids.append(cast["id"])
            cast_ids = '|'.join(str(x) for x in cast_ids)


        discover = tmdb.Discover()
        response = discover.movie(
            with_genres=[genres_ids],
            with_crew=[crew_ids],
            with_cast=[cast_ids]
        )
        check_rate_limit()

        #this is due to a tmdb bug!!
        if(discover.total_pages > 1000):
            latest_page=1000
        else:
            latest_page=discover.total_pages
        if(discover.total_results<self.reclist_length):
            max_length=discover.total_results
        else:
            max_length=self.reclist_length

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
            check_rate_limit()
            random_movie = discover.results[random.randint(0,len(discover.results)-1)]
            already_selected=False
            for movie in movies:
                if(movie["id"]==random_movie["id"]):
                    already_selected=True
            if(already_selected==False):
                movies.append(random_movie)
                count = count + 1

        response = exclude_seen(movies, self.selected_items)
        return response

    def get_movies(self):
        ncrew = 1
        ncast = 1
        movies = self.get_random(ncrew, ncast)

        while(len(movies)<self.reclist_length):
            print("random_movies: " +str(len(movies)))
            ncrew = ncrew + 7
            ncast = ncast + 7
            movies = movies + new_movies(movies, self.get_random(ncrew, ncast))

        movies = movies[:self.reclist_length]
        return movies
