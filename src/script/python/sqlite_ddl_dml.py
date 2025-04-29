import sqlite3
import datetime
from datetime import timezone, timedelta
import random

#from datetime import datetime, timedelta, timezone

def create_table(db_path):
    # Connect to the SQLite database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS data (
            id INTEGER PRIMARY KEY,
            time TEXT,
            rssi REAL NOT NULL,
            Src_Name TEXT
        )
    ''')
    
    n_reduce_by = 15
    dt = datetime.datetime.now(datetime.UTC)
    
    for i in range(1,50):
        #utc_datetime = dt - timedelta(minutes=n_reduce_by*i)
        utc_datetime = dt - timedelta(minutes=15*i)
        print(utc_datetime.isoformat())
        negative_int = random.randint(-70, -1)
        cursor.execute("INSERT INTO data (time, rssi, Src_Name) VALUES (?, ?, ?)", (utc_datetime.isoformat(), negative_int, '289803390'))
        conn.commit()

    # Close the connection
    conn.close()

def main(db_path):
    # Get table information and foreign key relationships
    create_table(db_path)

if __name__ == "__main__":
    db_path = '.\grind.db'
    main(db_path)
