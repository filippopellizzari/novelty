import scipy.sparse as sps
import numpy as np

from movies.services import get_movie_by_id

def check_selected_items(items, nitems):
    #item index must not exceed similarity matrix dimensions
    new_items = []
    for item in items:
        if (item < nitems):
            new_items.append(item)
    return new_items

def make_user_profile(prefs,nitems):
    values = np.ones(len(prefs))
    rows = np.zeros(len(prefs))
    cols = prefs
    return sps.csr_matrix((values, (rows, cols)),shape= (1,nitems), dtype=np.float32)

def recommend_movies(user_profile, model, n=None, exclude_seen=True):
    # compute the scores using the dot product
    assert user_profile.shape[1] == model.shape[0], 'The number of items does not match!'
    scores = user_profile.dot(model).toarray().ravel()

    # rank items
    ranking = scores.argsort()[::-1]
    if exclude_seen:
        seen = user_profile.indices
        unseen_mask = np.in1d(ranking, seen, assume_unique=True, invert=True)
        ranking = ranking[unseen_mask]

    count = 0
    movies = []
    for movie_id in ranking:
        movie = get_movie_by_id(movie_id)
        if(movie!=None):
            movies.append(get_movie_by_id(movie_id))
            count = count + 1
        if (count == n):
            break

    return movies

def recommend(model_file, selected_items):

    model = sps.load_npz(model_file)
    nitems = model.shape[0]
    new_selected_items = check_selected_items(selected_items,nitems)
    user_profile = make_user_profile(new_selected_items,nitems)

    movies = recommend_movies(user_profile,model,5)
    return movies
