import sqlite3
import mysql.connector
import csv

# Connect to SQLite database
sqlite_connection = sqlite3.connect('C:\LGTM\grafana-v11.1.3\data\grafana.db')
sqlite_connection.text_factory = str
sqlite_cursor = sqlite_connection.cursor()

# Example of fetching all table names in SQLite
sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table' and name = 'dashboard' limit 5;")
tables = sqlite_cursor.fetchall()

with open('grafana_to_mysql_migration.csv', 'w', newline='') as csvfile:
    csv_writer = csv.writer(csvfile)
    
    for table in tables:
        table_name = table[0]

        # Fetch data from SQLite table
        sqlite_cursor.execute(f"SELECT * FROM {table_name} LIMIT 2")
        rows = sqlite_cursor.fetchall()

        # Get columns from the SQLite table
        column_headers = [description[0] for description in sqlite_cursor.description]
        try:
            csv_writer.writerow(column_headers)
            count = 1
            for row in rows:
                #print(type(row))
                #[item.decode('utf-8') for item in str(row)]
                decoded_row = tuple(item.decode('utf-8') if isinstance(item, bytes) else item for item in row)
                #print(str(row))
                print(decoded_row)
                #decoded_row = tuple(row.decode('utf-8') if isinstance(row, str) else val for val in row)
                #decoded_row = [[s.decode('utf8') for s in t] for t in row]
                #decoded_row = [item.decode('utf-8') for item in row]
                #decode_row = row[4].decode('utf-8')
                #row[4] = decode_row
                #print(decode_row)
                #if count == 2:
                #    break
                #count += 1
                #print(row)
                csv_writer.writerow(decoded_row)          
        except sqlite3.Error as e:
            print('Following error on table {table_name}', e)        

sqlite_connection.close()
