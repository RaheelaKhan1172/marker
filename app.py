#! /usr/bin/env python3

import sqlite3
from functools import wraps

from flask import Flask
from flask import request
from flask import jsonify
from flask import g
from flask import make_response

from config import get_db
from helpers import is_authenticated
from helpers import insert_into_db
from helpers import validate_user
from helpers import get_marks_for
from helpers import add_mark
from helpers import delete_marks_for
from helpers import delete_mark
from helpers import update_mark
from helpers import get_mark
from helpers import get_user_id
from helpers import user_from_token
from helpers import create_token

from exceptions import UserRegistrationError
from exceptions import UserLoginError

import pdb

app = Flask(__name__)

@app.before_request
def make_connection():
  g.db = get_db()

@app.teardown_appcontext
def close_connection(exception):
  db = getattr(g, '__datebase', None)
  if db is not None:
    db.close()

@app.errorhandler(404)
def not_found(error):
  resp = make_response('Not Found', 404)
  return resp

def login_required(f):
  @wraps(f)
  def inner_func(*args, **kw):
    user_name, password = (request.authorization.username, request.authorization.password) if request.authorization else (None, None)
    if not password and  not user_name:
      return jsonify({"error": "missing"}), 401 
    if not password:
      user = user_from_token(user_name)  
      if user is not None:
        g.user_id = user[0]
        return f(*args, **kw)
    
    elif validate_user({'email': user_name, 'password': password}):
      g.user_id = get_user_id(user_name)
      return f(*args, **kw)
    
    return jsonify({'error': 'error'}), 401## not authenticated 
  return inner_func  

@app.route('/')
@login_required
def index():
  return jsonify({"ok": True})

@app.route('/token', methods = ['POST', 'GET'])
@login_required
def sign_in():
  token = create_token(g.user_id)
  return jsonify({"token": token.decode('ascii')})

@app.route('/users', methods = ['POST'])
def sign_up():
  data = request.get_json() #since json is sent, and not form
  try:
    insert_into_db({'email': data['email'], 'password': data['password']})
  except UserRegistrationError as inst:
    return jsonify({'error': inst.args}), 400
  else:
    return jsonify({"success": "ok"}), 201

##get, update, dlete marks for single user
## make a helper (is authenticated or similar )
@app.route('/users/<int:u_id>/marks', methods = ['GET', 'POST', 'DELETE'])
@login_required
def marks(u_id):
  authenticated_id = g.user_id
  if request.method == 'GET':
    mark_list = None
    try:
      mark_list = get_marks_for(int(authenticated_id))
    except Exception as inst:
      return jsonify({"error": inst.args}), 400
    else:
      return jsonify({"marks": mark_list}),200
  if request.method == 'POST':
    keys = ['mark_author', 'mark_name', 'notes', 'location']
    data = request.get_json()
    selection = {}
    for key in keys:
      selection[key] = data.get(key, '') 
    selection['user_id'] = authenticated_id
    try:
      add_mark(selection)
    except Exception as inst:
      return jsonify({"error": inst.args}), 400
    else:
      return jsonify({"success": "ok"}), 201
  if request.method == 'DELETE':
    try:
      delete_marks_for(int(authenticated_id))
    except Exception as inst:
      return jsonify({"error": inst.args}), 400
    else:
      return jsonify({"success": "ok"}), 204

##handle single mark ( check if user has permission to modify mark before allowing access)
@app.route('/marks/<int:m_id>', methods = ['GET', 'PUT', 'DELETE'])
@login_required
def mark(m_id):
  if request.method == 'GET':
    mark_ = None
    try:
      mark_ = get_mark(m_id)  
    except Exception as inst:
      return jsonify({"error": inst.args}), 400
    else:
      return jsonify({"mark": mark_}), 200
  if request.method == 'PUT':
    try:
      keys = ["mark_id", "mark_author", "mark_name", "notes", "location"]
      data = request.get_json()
      updates = {}
      for key in keys:
        updates[key] = data.get(key, '')
      
      update_mark(updates,m_id)
    except Exception as inst:
      return jsonify({"error": inst.args}), 400
    else:
      return jsonify({"success": "ok"}), 201
  if request.method == 'DELETE':
    try:
      delete_mark(m_id)
    except Exception as inst:
      return jsonify({"error": inst.args}), 400 
    else:
      return jsonify({"success": "ok"}), 204

@app.route('/test')
@login_required
def test():
    return jsonify({"success": g.user_id}), 200  
