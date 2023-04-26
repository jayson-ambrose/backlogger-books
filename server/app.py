from flask import request, make_response, session
from flask_restful import Resource

from config import app, db, api
from models import User, Review, Backlog, Book

app.secret_key = 'change this secret key'

if __name__ == '__main__':
    app.run(port=5555, debug=True)