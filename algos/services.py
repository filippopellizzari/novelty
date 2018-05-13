import scipy.sparse as sps
import numpy as np

from movies.services import get_movie_by_id

def make_user_profile(prefs,nitems):
    values = np.ones(len(prefs))
    rows = np.zeros(len(prefs))
    cols = prefs
    return sps.csr_matrix((values, (rows, cols)),shape= (1,nitems), dtype=np.float32)

def recommend_items(user_profile, model, n=None, exclude_seen=True):
    # compute the scores using the dot product
    assert user_profile.shape[1] == model.shape[0], 'The number of items does not match!'
    scores = user_profile.dot(model).toarray().ravel()

    # rank items
    ranking = scores.argsort()[::-1]
    if exclude_seen:
        seen = user_profile.indices
        unseen_mask = np.in1d(ranking, seen, assume_unique=True, invert=True)
        ranking = ranking[unseen_mask]
    return ranking[:n]

def recommend(model_file, selected_items):

    model = sps.load_npz(model_file)
    nitems = model.shape[0]
    user_profile = make_user_profile(selected_items,nitems)

    items = recommend_items(user_profile,model,10)

    movies = []
    for movie_id in items:
        movie = get_movie_by_id(movie_id)
        if(movie!=None):
            movies.append(get_movie_by_id(movie_id))

    return movies[:5]
