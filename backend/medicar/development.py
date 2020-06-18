from medicar.base import *  # noqa f403

DEBUG = True

SECRET_KEY = "huahkn48421dnnqyyjhybdbfq14578"

ALLOWED_HOSTS = ["*"]

# django-debug-toolbar
INSTALLED_APPS += ["debug_toolbar"]  # noqa F405
MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]  # noqa F405
DEBUG_TOOLBAR_CONFIG = {
    "DISABLE_PANELS": ["debug_toolbar.panels.redirects.RedirectsPanel"],
    "SHOW_TEMPLATE_CONTEXT": True,
}

# django-extensions
INSTALLED_APPS += ["django_extensions"]  # noqa F405

CORS_ORIGIN_WHITELIST = ("http://localhost:4200",)
