from .recommenders.TopRated import Top_Rated_Recommender
from .recommenders.TopPop import Top_Pop_Recommender
from .recommenders.Random import Random_Recommender


def recommend(algorithm, selected_items, reclist_length):
    rec_name = algorithm.get("rec_name")

    if(rec_name=="top_pop"):
        print("TOP_POP")
        recommender = Top_Pop_Recommender(selected_items, reclist_length,
            genre=algorithm.get("genre"),crew=algorithm.get("crew"),cast=algorithm.get("cast"))
    elif(rec_name=="top_rated"):
        print("TOP_RATED")
        recommender = Top_Rated_Recommender(selected_items, reclist_length)
    elif(rec_name=="random"):
        print("RANDOM")
        recommender = Random_Recommender(selected_items, reclist_length,
            genre=algorithm.get("genre"),crew=algorithm.get("crew"),cast=algorithm.get("cast"))

    movies = recommender.get_movies()
    return movies
