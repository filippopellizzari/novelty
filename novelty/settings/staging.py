from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    'novelty-recsys-stage.herokuapp.com'
]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATICFILES_DIRS = [
  os.path.join(BASE_DIR, 'assets'),
]

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')


STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES['default'] = dj_database_url.config(
    default='postgres://gqlqkdnbagwckx:e84b56e5519326ae3626ea1a61e6fdf941ab2da8573610bc37ac54ad4686e8ec@ec2-54-235-64-195.compute-1.amazonaws.com:5432/d5ti7qeqk5nrnr'
)

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
        }
}
