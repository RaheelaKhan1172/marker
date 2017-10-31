import sqlite3

from flask import g

DATABASE = './mark.db'

def get_conn():
  return sqlite3.connect(DATABASE)

def get_db():
  db = getattr(g, '_database', None)
  if db is None:
    db = g._database = get_conn()
  return db
