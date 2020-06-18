from django.shortcuts import render
from copy import copy
from datetime import date
from django.utils import timezone

from apps.scheduling.models import Especialidade, Medico, Agenda, Consulta
from apps.scheduling.serializers import EspecialidadeSerializer, MedicoSerializer, AgendaSerializer, ConsultaSerializer, CreateConsultaSerializer
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


class EspecialidadeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAdminUser,)
    serializer_class = EspecialidadeSerializer
    queryset = Especialidade.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ["nome"]


class MedicoViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAdminUser,)
    serializer_class = MedicoSerializer
    queryset = Medico.objects.all()
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["nome"]
    filterset_fields = ["especialidade"]


class AgendaViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AgendaSerializer
    queryset = Agenda.objects.all()
    search_fields = ["medico"]


@api_view(['GET', 'POST'])
def consultas_views(request):
    
    if request.method == 'GET':
        now = timezone.now()
        consultas = Consulta.objects.filter(user=request.user, dia__gte=now.date(), horario__gte=now.time())
        consultas = consultas.order_by('dia', 'horario')
        serializer = ConsultaSerializer(consultas, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = copy(request.data)
        data.update({'user':request.user.id})
        serializer = CreateConsultaSerializer(data=data)
        if serializer.is_valid():
            if Agenda.objects.all().filter( id = serializer.validated_data['agenda_id']).exists():
                agenda = Agenda.objects.all().get( id = serializer.validated_data['agenda_id'])
                for hora in agenda.hora.all():
                    if hora.hora == serializer.validated_data['horario'].strftime("%H:%M"):
                        consulta = serializer.save()
                        return Response(ConsultaSerializer(consulta).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def consultas_delete(request, pk):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    try:
        consulta = Consulta.objects.get(user=request.user, pk=pk)
        consulta.delete()
        return Response(status=None)
    except Consulta.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)