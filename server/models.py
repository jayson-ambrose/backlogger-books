from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ("-created_at", "-updated_at", '-password',
                       '-backlogs.user', '-reviews.user', '-books_reviewed.user',
                       '-books_backlogged.user', '-backlogs.book', '-reviews.book',
                       '-_password')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password = db.Column(db.String, nullable=False)
    favorite_author = db.Column(db.String)
    favorite_title = db.Column(db.String)

    reviews = db.relationship('Review', backref='user')
    backlogs = db.relationship('Backlog', backref='user')

    books_reviewed = association_proxy('reviews', 'books')
    books_backlogged = association_proxy('backlogs', 'books')

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    #auth stuff

    @hybrid_property
    def password(self):
        return self._password
    
    @password.setter
    def password(self, password):
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        self._password = password_hash

    def auth(self, password):
        print(bcrypt.check_password_hash(self.password, password))
        return bcrypt.check_password_hash(self.password, password)

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    author = db.Column(db.String)
    isbn = db.Column(db.String)

    reviews = db.relationship('Review', backref='book')
    backlogs = db.relationship('Backlog', backref='book')

    reviewed_by = association_proxy('reviews', 'users')
    backloged_by = association_proxy('backlogs', 'users')

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    review_text = db.Column(db.Text)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())    
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())    

class Backlog(db.Model, SerializerMixin):
    __tablename__ = 'backlogs'
    
    id = db.Column(db.Integer, primary_key=True)
    completed = db.Column(db.Boolean)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())



