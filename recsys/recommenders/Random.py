import random
import requests
from .utils import exclude_seen, check_rate_limit, new_movies
from .content import get_genres_ids, get_crew_ids, get_cast_ids

class Random_Recommender:

    def __init__(self, algorithm, content, selected_items, reclist_length):
        self.genre = algorithm.get("genre")
        self.crew = algorithm.get("crew")
        self.cast = algorithm.get("cast")
        self.content = content
        self.selected_items = selected_items
        self.reclist_length = reclist_length


    def get_content(self):
        ngenres = 2
        ncrew = 12
        ncast = 12

        if(self.genre):
            self.genres_ids = get_genres_ids(self.content["genres"], ngenres)
            #print("random_genres_ids: " + self.genres_ids)
        if(self.crew):
            self.crew_ids = get_crew_ids(self.content["crew"], ncrew)
            #print("random_crew_ids: " + self.crew_ids)
        if(self.cast):
            self.cast_ids = get_cast_ids(self.content["cast"], ncast)
            #print("random_cast_ids: " + self.cast_ids)

    def get_random(self):

        url = "https://api.themoviedb.org/3/discover/movie?"\
        "api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"\
        "&include_adult=false&page=1&release_date.lte=2019"
        if(self.genre):
            url += "&with_genres="+self.genres_ids
        if(self.crew):
            url += "&with_crew="+self.crew_ids
        if(self.cast):
            url += "&with_cast="+self.cast_ids
        r = requests.get(url)
        check_rate_limit(r)
        #this is due to a tmdb bug!!
        total_pages=r.json()["total_pages"]
        total_results=r.json()["total_results"]
        if(total_pages > 1000):
            latest_page=1000
        else:
            latest_page=total_pages
        if(total_results<self.reclist_length):
            max_length=total_results
        else:
            max_length=self.reclist_length

        movies = []
        count = 0
        while(count < max_length):
            random_page = random.randint(1,latest_page)

            url = "https://api.themoviedb.org/3/discover/movie?"\
            "api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"\
            "&include_adult=false&page="+str(random_page)+"&release_date.lte=2019"
            if(self.genre):
                url += "&with_genres="+self.genres_ids
            if(self.crew):
                url += "&with_crew="+self.crew_ids
            if(self.cast):
                url += "&with_cast="+self.cast_ids

            r = requests.get(url)
            check_rate_limit(r)
            results = r.json()["results"]

            random_movie = results[random.randint(0,len(results)-1)]
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
        self.get_content()
        movies = self.get_random()
        if(len(movies)<self.reclist_length):
            print("random_movies: " +str(len(movies)))
            self.crew = False
            self.cast = False
            movies = movies + new_movies(movies, self.get_random())
        if(len(movies)<self.reclist_length):
            print("random_movies: " +str(len(movies)))
            self.genre = False
            movies = movies + new_movies(movies, self.get_random())
        print("random_movies: " +str(len(movies)))
        movies = movies[:self.reclist_length]
        return movies
