from .recommenders.content import get_genres, get_crew_cast
from .recommenders.TopRated import Top_Rated_Recommender
from .recommenders.TopPop import Top_Pop_Recommender
from .recommenders.Random import Random_Recommender


def recommend(algorithm, content, selected_items, reclist_length):
    rec_name = algorithm.get("rec_name")

    if(rec_name=="top_pop"):
        print("TOP_POP")
        recommender = Top_Pop_Recommender(algorithm, content, selected_items, reclist_length)
    elif(rec_name=="random"):
        print("RANDOM")
        recommender = Random_Recommender(algorithm, content, selected_items, reclist_length)
    elif(rec_name=="top_rated"):
        print("TOP_RATED")
        recommender = Top_Rated_Recommender(selected_items, reclist_length)


    movies = recommender.get_movies()
    return movies

def get_content(selected_items):
    genres = get_genres(selected_items)
    crew, cast = get_crew_cast(selected_items)
    content = {"genres":genres, "crew":crew, "cast":cast}
    return content
