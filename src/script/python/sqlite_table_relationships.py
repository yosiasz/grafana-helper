import sqlite3

def get_foreign_keys(db_path):
    # Connect to the SQLite database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Query the foreign key relationships for each table
    cursor.execute("PRAGMA foreign_key_list;")
    foreign_keys = cursor.fetchall()

    # Close the connection
    conn.close()

    return foreign_keys

def get_tables_and_columns(db_path):
    # Connect to the SQLite database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Get the table names
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()

    table_info = {}
    for table in tables:
        table_name = table[0]
        cursor.execute(f"PRAGMA table_info({table_name});")
        columns = cursor.fetchall()
        table_info[table_name] = [column[1] for column in columns]  # column names

    # Close the connection
    conn.close()

    return table_info

def main(db_path):
    # Get table information and foreign key relationships
    table_info = get_tables_and_columns(db_path)
    foreign_keys = get_foreign_keys(db_path)

    # Print the table structure
    print("Tables and Columns:")
    #for table, columns in table_info.items():
    #    print(f"Table: {table}")
    #    for col in columns:
    #        print(f"  - {col}")
    print(foreign_keys)
    # Print foreign key relationships
    print("\nForeign Key Relationships:")
    for fk in foreign_keys:
        print(f"From Table: {fk[0]} (Column: {fk[3]})")
        print(f"  -> To Table: {fk[2]} (Column: {fk[4]})")
        print(f"  (On delete: {fk[5]}, On update: {fk[6]})\n")

if __name__ == "__main__":
    db_path = 'C:\LGTM\grafana-v11.1.3\data\grafana.db'  # Path to your SQLite database
    main(db_path)
