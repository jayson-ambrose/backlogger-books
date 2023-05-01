from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User, Review, Backlog, Book

app.secret_key = 'change this secret key'

class Logout(Resource):
    def get(self):
        session['user_id'] = None
        return {}, 204
    
    def delete(self):
        print(session['user_id'])
        session['user_id'] = None
        return {}, 204

class Login(Resource):

    def post(self):
        req_data = request.get_json()
        user = User.query.filter(User.username == req_data['username']).first()       
        
        try:
            if user.auth(req_data['password']) == False:
                print ('wrong password')
                return make_response({"error":"wrong password"}, 401) 
                      
            session['user_id'] = user.id
            print('made it here')
            print(session['user_id'])

            return make_response(user.to_dict(rules=("-reviews.book.users", "reviews.book", "-reviews.book.users",
                                                     "-reviews.book.reviews", "-reviews.book.backlogs",
                                                     "-reviews.book.")), 200)
        
        except:
            return make_response( {'error': '401 user not found or incorrect password'}, 401)

class Users(Resource):
    def get(self):
        user_list = []
        for user in User.query.all():
            user_list.append(user.to_dict(rules=("-reviews.book.users", "reviews.book", "-reviews.book.users",
                                                 "-reviews.book.reviews", "-reviews.book.backlogs",
                                                 "-reviews.book.")))

        return make_response(user_list, 200)
    
    def post(self):
        req = request.get_json()

        if req['password'] != req['re_password']:
            return make_response({'error':'401: passwords do not match.'}, 401)
        
        user = User(username=req.get('username'), password=req.get('password'))
        try:
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
            print(session['user_id'])
            return make_response(user.to_dict(rules=("-reviews.book.users", "reviews.book", "-reviews.book.users",
                                                 "-reviews.book.reviews", "-reviews.book.backlogs",
                                                 "-reviews.book.")), 201)
        except IntegrityError:
            db.session.rollback()
            return make_response({'error': 'error 400: Username already taken.'}, 400)
        

class Books(Resource):

    def get(self):
        bookList = []
        for book in Book.query.all():
            bookList.append(book.to_dict(rules={'-users', '-reviews', '-backlogs'}))

        return make_response(bookList, 200)
    
    def post(self):
        req = request.get_json()

        book = Book.query.filter(Book.isbn == req['isbn']).one_or_none()
        if not book:
            book = Book(title={req['title']}, author={req['author']}, isbn={req['isbn']})
            try:
                db.session.add(book)
                db.session.commit()
                user = User.query.filter(User.id == req['user_id']).one_or_none()
                return make_response(user.to_dict(rules=("-reviews.book.users", "reviews.book", "-reviews.book.users",
                                                 "-reviews.book.reviews", "-reviews.book.backlogs",
                                                 "-reviews.book.")), 201)
            except:
                return make_response({'error': 'error 400: Book does not exist and invalid data provided.'})

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

api.add_resource(Login,'/login')
api.add_resource(Users, '/users')
api.add_resource(Backlogs, '/backlogs')
api.add_resource(Logout, '/logout')
api.add_resource(Books, '/books')

if __name__ == '__main__':
    app.run(port=5055, debug=True)