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

r = requests.get(url = URL, headers = headers)

for d in r.json():
    uid = d.get('uid')
    title = d.get('title')    
    filename = title + '.json'
    db = requests.get(url = 'http://localhost:3903/api/dashboards/uid/' + uid, headers = headers)
    data = db.json()
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)