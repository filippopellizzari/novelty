import requests
from .utils import exclude_seen, check_rate_limit, new_movies

class Top_Pop_Recommender:

    def __init__(self, selected_items, reclist_length, genre=False, crew=False, cast=False):
        self.selected_items = selected_items
        self.reclist_length = reclist_length
        self.genre = genre
        self.crew = crew
        self.cast = cast

    def get_top_pop(self, ncrew=1, ncast=1):
        genres_ids = []
        crew_ids = []
        cast_ids = []
        if(self.genre):
            for movie_id in self.selected_items:
                url = "https://api.themoviedb.org/3/movie/"+str(movie_id)+"?"\
                "api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"
                r = requests.get(url)
                check_rate_limit(r)
                for genre in r.json()["genres"]:
                    genres_ids.append(genre["id"])
            genres_ids = '|'.join(str(x) for x in genres_ids)
        if(self.crew):
            for movie_id in self.selected_items:
                url = "https://api.themoviedb.org/3/movie/"+str(movie_id)+"/credits?"\
                "api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"
                r = requests.get(url)
                check_rate_limit(r)
                for crew in r.json()["crew"][0:ncrew]:
                    crew_ids.append(crew["id"])
            crew_ids = '|'.join(str(x) for x in crew_ids)
        if(self.cast):
            for movie_id in self.selected_items:
                url = "https://api.themoviedb.org/3/movie/"+str(movie_id)+"/credits?"\
                "api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"
                r = requests.get(url)
                check_rate_limit(r)
                for cast in r.json()["cast"][0:ncast]:
                    cast_ids.append(cast["id"])
            cast_ids = '|'.join(str(x) for x in cast_ids)


        url = "https://api.themoviedb.org/3/discover/movie?"\
        "api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"\
        "&sort_by=popularity.desc&include_adult=false&page=1"\
        "&with_genres="+genres_ids+"&with_crew="+crew_ids+"&with_cast="+cast_ids
        r = requests.get(url)
        check_rate_limit(r)
        results = r.json()["results"]

        response = exclude_seen(results, self.selected_items)
        return response

    def get_movies(self):
        ncrew = 1
        ncast = 1
        movies = self.get_top_pop(ncrew, ncast)

        while(len(movies)<self.reclist_length):
            print("top_pop_movies: " +str(len(movies)))
            ncrew = ncrew + 5
            ncast = ncast + 5
            movies = movies + new_movies(movies,self.get_top_pop(ncrew, ncast))

        movies = movies[:self.reclist_length]
        return movies
