from .settings import *
import dj_database_url

ENVIRONMENT = 'production'
DEBUG = False

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "assets"),
]

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
        }
}

DATABASES['default'] = dj_database_url.config(
    default='postgres://gqlqkdnbagwckx:e84b56e5519326ae3626ea1a61e6fdf941ab2da8573610bc37ac54ad4686e8ec@ec2-54-235-64-195.compute-1.amazonaws.com:5432/d5ti7qeqk5nrnr'
)
