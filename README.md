Sistema para uma clínica chamada Medicar com marcação de consultas e gerenciamentode  seu corpo médico.

Para executar o projeto basta usar o comando abaixo:

Usado windows 10 para criar a apliacação com o python 3.8.2 e nodejs 14.4.0
 
Os comandos a seguir são executados usando o powershell na versão 5.1

backend

Instalando dependências
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r .\backend\requirements.txt
```

Para executar a api
```powershell
python .\backend\manage.py runserver
```

frontend
```powershell
cd frontend
npm install
```


Rodando aplicação
back
    python manage.py runserver

front
    ng serve

a API funciona em http://localhos:8000 e o front em http://localhos:4200

