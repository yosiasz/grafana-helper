import sqlite3
database = 'C:\LGTM\grafana-v11.1.3\data\grafana.db'

try:
    with sqlite3.connect(database) as conn:
        cur = conn.cursor()
        cur.execute('SELECT * FROM user')
        rows = cur.fetchall()
        for row in rows:
            print(row)
except sqlite3.Error as e:
    print(e)
