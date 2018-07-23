import requests
from .utils import check_rate_limit
from collections import Counter

def get_genres_ids(selected_items):
    genres_ids = []
    for movie_id in selected_items:
        url = "https://api.themoviedb.org/3/movie/"+str(movie_id)+"?"\
        "api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"
        r = requests.get(url)
        check_rate_limit(r)
        for genre in r.json()["genres"]:
            genres_ids.append(genre["id"])
    cnt = Counter(genres_ids).most_common(2)
    most_common = [x[0] for x in cnt]
    genres_ids = '|'.join(str(x) for x in most_common)
    print("genres computed")
    return genres_ids

def get_crew_cast_ids(selected_items, ncrew, ncast):
    crew_ids = []
    cast_ids = []
    for movie_id in selected_items:
        url = "https://api.themoviedb.org/3/movie/"+str(movie_id)+"/credits?"\
        "api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"
        r = requests.get(url)
        check_rate_limit(r)
        for crew in r.json()["crew"][0:ncrew]:
            crew_ids.append(crew["id"])
        for cast in r.json()["cast"][0:ncast]:
            cast_ids.append(cast["id"])
    crew_ids = '|'.join(str(x) for x in crew_ids)
    cast_ids = '|'.join(str(x) for x in cast_ids)
    print("crew and cast computed")
    return crew_ids, cast_ids
