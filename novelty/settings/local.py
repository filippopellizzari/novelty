from .base import *

DEBUG = True

ALLOWED_HOSTS = []


WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.dev.json'),
        }
}

#EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

#Email backend

EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_HOST_USER = 'filippopellizzari'
EMAIL_HOST_PASSWORD = 'Philpelli93'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
