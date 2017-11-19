import sqlite3
import pdb
import json

from flask import Flask
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer,
                          BadSignature,
                          SignatureExpired)

from config import get_db
from exceptions import UserRegistrationError
from exceptions import UserLoginError

from passlib.apps import custom_app_context as pwd_context

secret_key = 'secret_key'

def auto_commit(func):
  def inner(*args, **kw):
    db = get_db()
    try:
      func(*args, db=db, **kw)
      db.commit()
    except Exception as inst:
      raise inst
    else:
      db.close()
  return inner


def is_authenticated():
  return True


def get_user_id(email):
  db = get_db()
  try:
    user = db.execute('''SELECT user_id FROM user where email=?''', (email,))
  except sqlite3.IntegrityError as inst:
    raise inst
  else:
    return user.fetchone()


def validate_user(user):
  db = get_db()

  valid_user = None
  try: 
    valid_user = db.execute('''
      SELECT password FROM user
      WHERE email=?
    ''', (user['email'],)).fetchone()
    #pdb.set_trace()
    if valid_user:
      return pwd_context.verify(user['password'], valid_user[0])
  except Exception:
    raise UserLoginError('Email or password is incorrect')
  else:
    return False

@auto_commit
def insert_into_db(user, db=None):
  if db is None:
    db = get_db()

  if not user['email'] or not user['password']:
    raise UserRegistrationError('Email or Password not provided')

  try:
    password = pwd_context.encrypt(user['password'])
    result = db.execute('''
      INSERT INTO user(email, password) VALUES(?,?)
    ''', (user['email'], password))
  except sqlite3.IntegrityError:
    raise UserRegistrationError('Email already exists')
  else:
    return True

def get_marks_for(user_id):
  db = get_db()
  keys = ['mark_id','mark_author', 'mark_name', 'notes', 'location', 'user_id']
  marks = None
  print(user_id)
  #pdb.set_trace()
  try:
    marks = db.execute('''
      SELECT * FROM mark
      WHERE user_id=?
    ''', (user_id,))
    marks = marks.fetchall()
    db.close()
  except Exception as inst:
    raise inst
  else:
    result = []
    for mark in marks:
      temp = dict(zip(keys, mark))
      result.append(temp) 

    return result

@auto_commit
def add_mark(data,db=None):
  if db is None:
    db = get_db() 
  
  values = None
  try:
    values = list(map(lambda x: data.get(x), data.keys()))
  except Exception as inst:
    raise inst
  
  try:
    db.execute('''
      INSERT INTO mark(mark_author, mark_name, notes, location, user_id)
      VALUES(
        ?, ?, ?, ?, ?
      )
    ''',values)
  except sqlite3.IntegrityError as inst:
    raise inst
  else:
    return True

@auto_commit
def delete_marks_for(user_id, db=None):
  if db is None:
    db = get_db()

  try:
    db.execute('''
      DELETE FROM mark
      where user_id=?
    ''', (user_id,))
  except sqlite3.IntegrityError as inst:
    raise inst
  else:
    return True

def get_mark(mark_id):
  db = get_db()
  mark = None
  keys = ['mark_id','mark_author', 'mark_name', 'notes', 'location', 'user_id']
  try:
    mark = db.execute('''
      SELECT * FROM mark
      WHERE mark_id=?
    ''', (mark_id,))
    mark = mark.fetchall()
    db.close()
  except sqlite3.IntegrityError as inst:
    raise inst
  else:
    result = dict(zip(keys,list(mark[0])))
    return result

@auto_commit
def update_mark(updates, mark_id, db=None):
  if db is None:
    db = get_db()

  try:
    values = list(map(lambda x: updates.get(x), updates.keys()))
    values.append(mark_id)
    db.execute('''
      UPDATE mark
      SET mark_author=?,
          mark_name=?,
          notes=?,
          location=?
      WHERE mark_id=?
    ''',values)
  except sqlite3.IntegrityError as inst:
    raise inst
  else:
    return True

@auto_commit
def delete_mark(mark_id, db=None):

  if db is None:
    db = get_db()

  try: 
    db.execute('''
      DELETE FROM mark
      WHERE mark_id=?
    ''', (mark_id,))
  except sqlite3.IntegrityError as inst:
    raise inst
  else: 
    return True

def get_serializer(expiration_time=24 * 60 * 60):
  return Serializer(secret_key, expires_in=expiration_time) 

def create_token(user_id, expiration_time=24 * 60 * 60):
  s = get_serializer()
  return s.dumps({'user_id': user_id})

def user_from_token(token):
  s = get_serializer()
  try:
    data = s.loads(token)
  except SignatureExpired:
    return None
  except BadSignature:
    return None
  else:
    u_id = data['user_id']
    #print(u_id)
    #pdb.set_trace()
    db = get_db()
    user = db.execute('SELECT * FROM user WHERE user_id=?',(u_id[0],))
    return user.fetchone()
