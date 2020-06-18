from django.urls import path
from . import views
from django.urls import include
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"especialidades", views.EspecialidadeViewSet, basename="especialidades")
router.register(r"medicos", views.MedicoViewSet)
router.register(r"agendas", views.AgendaViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('consultas/', views.consultas_views,name='consultas'),
    path('consultas/<int:pk>', views.consultas_delete),
]

