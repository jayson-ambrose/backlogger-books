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
    
class BooksById(Resource):
    #get book details from backend by isbn (used by backlog not search)
    pass

class Reviews(Resource):
    #get all reviews
    pass

class ReviewsByBookId(Resource):
    #get reviews by book id
    pass

class Backlogs(Resource):

    #backlog post should send in object {
    # user_id
    # isbn
    # title
    # author
    # }

    def post(self):
        req_data = request.get_json()
        book = Book.query.filter(Book.isbn == req_data['isbn']).one_or_none()
        if not book:
            new_book = Book(title = req_data['title'], author = req_data['author'], isbn = req_data['isbn'])
            try:
                db.session.add(new_book)
                db.session.commit()

                book = Book.query.filter(Book.isbn == req_data['isbn'].one_or_none())
            except:
                return make_response({"error": "something went wrong on our end"}, 500)
            
        backlog = Backlog(completed=0, user_id=req_data['user_id'], book_id=book.id)
        try:
            db.session.add(backlog)
            db.session.commit()
            return make_response(backlog.to_dict(only={'user.id', 'completed'}), 201)

        except:
            return make_response({"error": "something went wrong"}, 400)


api.add_resource(Users, '/users')
api.add_resource(Backlogs, '/backlogs')

if __name__ == '__main__':
    app.run(port=5555, debug=True)