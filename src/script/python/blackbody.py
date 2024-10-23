import sqlite3
from sqlite3 import Error
import datetime
import time
#from datetime import datetime, timedelta


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
    
    grafu = ''' INSERT INTO grafanalearn(learn_date, ObjectId, Kpi1)
                VALUES(?,?,?) '''
    
    cur.execute(grafu, data)
    conn.commit()
    return cur.lastrowid

def create_table(conn):
    conn.execute("DROP TABLE IF EXISTS grafanalearn")
 
    # Creating table
    sql = """ CREATE TABLE grafanalearn (
                learn_date TEXT NOT NULL,
                ObjectId VARCHAR(25) NOT NULL,
                Kpi1 INT
            ); """
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    return cur

def main():
    #database = r"..\..\data\blackbody.db"
    #database = r"C:\myapps\grafana-helper\src\data\blackbody.db"
    database =r'C:\LGTM\grafana-v10.4.1\data\metrics.db'
    # create a database connection
    conn = create_connection(database)

    with conn:
        table = create_table(conn)
        #print('table', table)
        #create data
        
        
        for x in range(1,50):
            utc_date = datetime.datetime.now(datetime.UTC) - datetime.timedelta(minutes=x) 
            metri_date = utc_date.isoformat();
            #metri_date = datetime.now(datetime.UTC) - timedelta(hours=0, minutes=x)
            #datetime.datetime.utcnow() - datetime.timedelta(minutes=5)
                     
            data = (metri_date, 'Server_' + str(x),x*1.5);
            print('data', data)
            data_id = create_data(conn, data)
            #time.sleep(3)

if __name__ == '__main__':
    main()        