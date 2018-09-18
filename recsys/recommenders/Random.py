import random
import requests
from .utils import exclude_seen, check_rate_limit
from .content import get_genres_ids, get_crew_ids, get_cast_ids

class Random_Recommender:

    def __init__(self, algorithm, content, selected_items, reclist_length, random_setting):
        self.genre = algorithm.get("genre")
        self.crew = algorithm.get("crew")
        self.cast = algorithm.get("cast")
        self.ngenres = algorithm.get("ngenres")
        self.ncrew = algorithm.get("ncrew")
        self.ncast = algorithm.get("ncast")
        self.content = content
        self.selected_items = selected_items
        self.reclist_length = reclist_length
        self.first_page = random_setting.get("first_page")
        self.last_page = random_setting.get("last_page")

    def get_content_ids(self):

        if(self.genre):
            self.genres_ids = get_genres_ids(self.content["genres"], self.ngenres)
            #print("random_genres_ids: " + self.genres_ids)
        if(self.crew):
            self.crew_ids = get_crew_ids(self.content["crew"], self.ncrew)
            #print("random_crew_ids: " + self.crew_ids)
        if(self.cast):
            self.cast_ids = get_cast_ids(self.content["cast"], self.ncast)
            #print("random_cast_ids: " + self.cast_ids)

    def get_total_results(self):
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

        self.total_pages=r.json()["total_pages"]
        #this is due to a tmdb bug!!
        if(self.total_pages > 1000):
            self.total_pages = 1000


        self.total_results=r.json()["total_results"]

    def get_random(self):

        print("total_random_pages: "+str(self.total_pages))
        if (self.total_pages < self.first_page):
            self.first_page = 1
        if (self.total_pages < self.last_page):
            self.last_page = self.total_pages

        if(self.last_page < self.first_page):
            self.last_page = self.first_page

        movies = []
        random_page = random.randint(self.first_page, self.last_page)
        print("random_page: "+str(random_page))
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
        random.shuffle(results)

        response = exclude_seen(results, self.selected_items)
        return response

    def get_movies(self):
        self.get_content_ids()
        self.get_total_results()

        if(self.total_results<20):
            self.crew = False
            self.cast = False
            self.get_total_results()
        if(self.total_results<20):
            self.genre = False
            self.get_total_results()

        movies = self.get_random()
        print("random_movies: " +str(len(movies)))
        movies = movies[:self.reclist_length]
        return movies
