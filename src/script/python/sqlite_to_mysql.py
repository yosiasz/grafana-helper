import sqlite3
import mysql.connector

# Connect to MySQL
mysql_connection = mysql.connector.connect(
    host="127.0.0.1",
    user="grafana",
    password="TechOps!",
    database="grafana_migrate"
)

mysql_cursor = mysql_connection.cursor()

# Connect to SQLite database
sqlite_connection = sqlite3.connect('C:\LGTM\grafana-v11.1.3\data\grafana.db')
sqlite_cursor = sqlite_connection.cursor()

# Example of fetching all table names in SQLite
sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table' and name = 'dashboard' limit 5;")
tables = sqlite_cursor.fetchall()

with open('grafana_to_mysql_migration.sql', 'w', newline='', encoding='utf-8') as file:
    for table in tables:
        table_name = table[0]

        # Fetch data from SQLite table
        sqlite_cursor.execute(f"SELECT * FROM {table_name}")
        rows = sqlite_cursor.fetchall()

        # Get columns from the SQLite table
        columns = [description[0] for description in sqlite_cursor.description]
        
        # Prepare the same table in MySQL
        # You would need to create the table in MySQL beforehand or use a similar process as shown
        # Now insert the data into MySQL
        #insert_query = f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES ({', '.join(['%s'] * len(columns))})"

        #insert_query = f"INSERT INTO {table_name} ({', `'.join(columns) })"
        insert_query = f"INSERT INTO {table_name} ({', '.join(f'`{w}`' for w in columns)})"
        #iq = f"INSERT INTO {table_name} ({', '.join(f'`{w}`' for w in columns)
        #insert_query = f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES ({', str({rows})})"
        # Write the SQL query to the file
        file.write("\n-- {table_name} \n")
        for row in rows:
            file.write("\n--insert row\n")            
            file.write(insert_query)
            file.write(" VALUES " + str(row).replace('None','null'))

    try:
        print('')
        #mysql_cursor.executemany(insert_query, str(rows))
        #mysql_connection.commit()
    #print(insert_query)
    except sqlite3.Error as e:
        print('Following error on table {table_name}', e)