#! /usr/bin/env python3

import sys
import sqlite3
import os

try:
  from config import get_conn
except ImportError:
  here = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
  sys.path.append(here)
  from config import get_conn

def drop_table(table):
  db = get_conn()

  if table == 'mark':
    db.execute(' DROP TABLE IF EXISTS mark')    

def create_table():
  db = get_conn()
  
  db.execute( '''
CREATE TABLE IF NOT EXISTS user(
  user_id INTEGER PRIMARY KEY UNIQUE NOT NULL, 
  email TEXT UNIQUE NOT NULL, 
  password TEXT NOT NULL
)''')
  
  db.execute( '''
CREATE TABLE IF NOT EXISTS mark(
  mark_id INTEGER PRIMARY KEY UNIQUE NOT NULL,
  mark_author TEXT,
  mark_name TEXT,
  notes text,
  location text,
  user_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(user_id)
)''' )

if __name__ == '__main__':  
  create_table()  
