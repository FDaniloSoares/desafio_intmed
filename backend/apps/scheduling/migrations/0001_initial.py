# Generated by Django 3.0.7 on 2020-06-18 01:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Especialidade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, verbose_name='Nome')),
            ],
            options={
                'verbose_name': 'Especialidade',
                'verbose_name_plural': 'Especialidades',
            },
        ),
        migrations.CreateModel(
            name='Hora',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hora', models.CharField(choices=[('08:00', '08:00'), ('09:00', '09:00'), ('10:00', '10:00'), ('11:00', '11:00'), ('12:00', '12:00'), ('14:00', '14:00'), ('14:00', '14:00'), ('16:00', '16:00'), ('17:00', '17:00'), ('18:00', '18:00')], max_length=5, unique=True)),
            ],
            options={
                'verbose_name': 'Hora',
                'verbose_name_plural': 'Horas',
            },
        ),
        migrations.CreateModel(
            name='Medico',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=120, verbose_name='Nome')),
                ('crm', models.PositiveIntegerField(unique=True, verbose_name='CRM')),
                ('email', models.EmailField(blank=True, max_length=254, null=True, verbose_name='E-mail')),
                ('telefone', models.IntegerField(blank=True, null=True, verbose_name='Telefone')),
                ('especialidade', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduling.Especialidade')),
            ],
            options={
                'verbose_name': 'Medico',
                'verbose_name_plural': 'Medicos',
            },
        ),
        migrations.CreateModel(
            name='Consulta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dia', models.DateField()),
                ('horario', models.TimeField()),
                ('data_agendamento', models.DateTimeField(auto_now_add=True, verbose_name='Agendado em')),
                ('medico', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduling.Medico')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='consultas', to=settings.AUTH_USER_MODEL, verbose_name='Usuario')),
            ],
            options={
                'verbose_name': 'Consulta',
                'verbose_name_plural': 'Consultas',
            },
        ),
        migrations.CreateModel(
            name='Agenda',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dia', models.DateField(null=True, verbose_name='Dia')),
                ('hora', models.ManyToManyField(related_name='horas', to='scheduling.Hora')),
                ('medico', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduling.Medico')),
            ],
            options={
                'verbose_name': 'Agenda',
                'verbose_name_plural': 'Agendas',
            },
        ),
    ]
