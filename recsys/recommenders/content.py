import requests
from .utils import check_rate_limit
from collections import Counter

def get_genres_ids(genres, ngenres):
    cnt = Counter(genres).most_common(ngenres)
    most_common = [x[0] for x in cnt]
    genres_ids = '|'.join(str(x) for x in most_common)
    return genres_ids

def get_crew_ids(crew, ncrew):
    crew_ids = []
    for c in crew:
        crew_ids.extend(c[0:ncrew])
    crew_ids = '|'.join(str(x) for x in crew_ids)
    return crew_ids

def get_cast_ids(cast, ncast):
    cast_ids = []
    for c in cast:
        cast_ids.extend(c[0:ncast])
    cast_ids = '|'.join(str(x) for x in cast_ids)
    return cast_ids


def get_genres(selected_items):
    genres_ids = []
    for movie_id in selected_items:
        url = "https://api.themoviedb.org/3/movie/"+str(movie_id)+"?"\
        "api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"
        r = requests.get(url)
        check_rate_limit(r)
        for genre in r.json()["genres"]:
            genres_ids.append(genre["id"])
    print("genres computed")
    return genres_ids

def get_crew_cast(selected_items):
    crew_lists = []
    cast_lists = []
    for movie_id in selected_items:
        crew_ids = []
        cast_ids = []
        url = "https://api.themoviedb.org/3/movie/"+str(movie_id)+"/credits?"\
        "api_key=a070e12e1c6d7b84ebc1b172c841a8bf&language=en-US"
        r = requests.get(url)
        check_rate_limit(r)
        for crew in r.json()["crew"]:
            crew_ids.append(crew["id"])
        for cast in r.json()["cast"]:
            cast_ids.append(cast["id"])
        crew_lists.append(crew_ids)
        cast_lists.append(cast_ids)

    print("crew and cast computed")
    return crew_lists, cast_lists
