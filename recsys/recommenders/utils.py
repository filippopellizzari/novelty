


#remove selected items from movie response
def exclude_seen(response,selected_items):
    new_response = []
    for movie in response:
        already_seen = False
        for movie_id in selected_items:
            if(movie["id"]==movie_id):
                already_seen = True
        if(already_seen==False):
            new_response.append(movie)
    return new_response
