import sqlite3
from sqlite3 import Error

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn

def create_data(conn, data):
    """
    Create a new project into the projects table
    :param conn:
    :param data:
    :return: data id
    """
    cur = conn.cursor()
    
    #check_table_exists = ''' SELECT name FROM sqlite_master WHERE type='table' AND name='spectrum' ''';

    #tableExists = cur.execute(check_table_exists)
    
    #cur.execute("CREATE TABLE spectrum(Red, Green, Blue, Temperature )")    

    sql = ''' INSERT INTO spectrum(Red, Green, Blue, Temperature)
              VALUES(?,?,?,?) '''
    
    cur.execute(sql, data)
    conn.commit()
    return cur.lastrowid

def main():
    database = r"C:\myapps\grafana-helper\src\data\blackbody.db"

    # create a database connection
    conn = create_connection(database)

    with conn:
        # create a new project
        data = (100, 112,424,4085);
        data_id = create_data(conn, data)

if __name__ == '__main__':
    main()        