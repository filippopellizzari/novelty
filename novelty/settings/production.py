from .base import *
import dj_database_url


DEBUG = False

ALLOWED_HOSTS = [
    'novelty-recsys.herokuapp.com'
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
    default='postgres://shcdesqppcvinr:af64d63257b5e17e5d3bc7c46a43630969781b55ada6b7c612e41a3bd9fde57f@ec2-54-227-251-233.compute-1.amazonaws.com:5432/d3nd3miufut1bg'
)

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
        }
}

#Email backend

EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_HOST_USER = 'filippopellizzari'
EMAIL_HOST_PASSWORD = 'Philpelli93'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
