Sistema para uma clínica chamada Medicar com marcação de consultas e gerenciamentode  seu corpo médico.

Para executar o projeto basta usar o comando abaixo:

Apliacação feita usando python 3.8.2 e nodejs 14.4.0
 



Instalando dependências

BACKEND
    
    pip install -r requirements.txt (dentro da pasta backend)

    Apos instalação de dependências é necessario ir onde o arquivo de "djangorestframework-simplejwt" foram instalados e em "rest_framework_simplejwt.tokens" modificar os parâmetros iniciais da classe Token :


        token_type = 'access'
        lifetime = timedelta(days=1) # Tempo arbitrario, pode ser colocado qualquer valor



FRONTEND

    npm install (dentro da pasta frontend)


Rodando aplicação
BACKEND
    python manage.py runserver

FRONTEND
    ng serve

a API funciona em http://localhos:8000 e o front em http://localhos:4200

