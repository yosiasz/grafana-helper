import requests
import json

# CouchDB config
COUCHDB_URL = 'http://localhost:5984'
DB_NAME = 'chords'
USERNAME = 'admin'
PASSWORD = 'secret'

# Create DB if not exists
requests.put(f"{COUCHDB_URL}/{DB_NAME}", auth=(USERNAME, PASSWORD))

#podman run -d --name guitaro -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=secret --hostname couchdb -p 5984:5984 couchdb       
# Load chord JSON
#json_url = 'https://raw.githubusercontent.com/T-vK/chord-collection/refs/heads/master/chords.json'
#response = requests.get(json_url)
#chords_data = response.json()

with open('./chords/chords.json', 'r', encoding='utf-8') as f:
    chords_data = json.load(f)

print('json_url data fetched')
for chord_name, shapes in chords_data.items():
    doc = {
        "_id": chord_name,  # use chord name as document ID
        "shapes": shapes
    }
    print('doc', doc)
    res = requests.put(
        f"{COUCHDB_URL}/{DB_NAME}/{chord_name}",
        data=json.dumps(doc),
        headers={"Content-Type": "application/json"},
        auth=(USERNAME, PASSWORD)
    )
    if res.status_code in (200, 201, 202):
        print(f"Inserted chord: {chord_name}")
    else:
        print(f"Error inserting {chord_name}: {res.text}")
