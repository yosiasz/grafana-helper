import requests
import json
from dotenv import load_dotenv
load_dotenv()
import os


TOKEN=os.getenv('TOKEN')
URL=os.getenv('URL')
headers= {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {}'.format(TOKEN)
}

jsonData = {
            "connMaxLifetime": 14400,
            "database": "grafana",
            "maxIdleConns": 100,
            "maxIdleConnsAuto": True,
            "maxOpenConns": 100,
            "postgresVersion": 1500,
            "sslmode": "disable"
        }

payload = {
            "orgId": 1,
            "name": "zihon",
            "type": "postgres",
            "access": "proxy",
            "url": "localhost:6543",
            "user": "postgres",
            "password": "ADD_YOURS",
            "database": "",
            "basicAuth": False,
            "basicAuthUser": "",
            "withCredentials": False,
            "isDefault": False,
            "jsonData": jsonData
        }

#list_datasources = requests.get(url = URL, headers = headers)
#print(list_datasources.json())

create_ds = requests.post(url = URL, headers = headers, data=json.dumps(payload))

print(create_ds.json())