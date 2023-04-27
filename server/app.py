from flask import request, make_response, session
from flask_restful import Resource
import requests
import json

from config import app, db, api
from models import User, Review, Backlog, Book

from dotenv import load_dotenv

app.secret_key = 'change this secret key'

class Users(Resource):
    def get(self):
        user_list = []
        for user in User.query.all():
            user_list.append(user.to_dict(only=('username', 'favorite_author', 'favorite_title')))

        return make_response(user_list, 200)
    
class Books(Resource):
    #get list of all books (check if book is present before posting)
    #post books to backend
    pass

class BooksById(Resource):
    #get book details from backend by isbn (used by backlog not search)
    pass

class Reviews(Resource):
    #get all reviews
    pass

class ReviewsByBookId(Resource):
    #get reviews by book id
    pass
    
api.add_resource(Users, '/users')
if __name__ == '__main__':
    app.run(port=5555, debug=True)