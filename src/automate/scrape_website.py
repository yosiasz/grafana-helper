import requests
import sqlite3
import datetime 

from bs4 import BeautifulSoup

#URL = "http://ludvikasegel.com/wx/cloudbase.asp"
#page = requests.get(URL)
#soup = BeautifulSoup(page.content, "html.parser")
#molnbas = soup.find_all("div", class_="cloudbase")
#print (molnbas[0].text.strip())


with sqlite3.connect("webscrape.db") as sqlite_connection:
    timestamp = datetime.datetime.utcnow().isoformat()  # timestamp, change to whatever you want
    sql_create_table = """ CREATE TABLE IF NOT EXISTS table_name (
                                            value integer NOT NULL,
                                            end_date text
                                        ); """

    desired_value = 1093

    sqlite_connection.execute(sql_create_table
    )

    sqlite_connection.execute(
        "INSERT INTO table_name VALUES (?, ?)",
        (970, timestamp)
    )
