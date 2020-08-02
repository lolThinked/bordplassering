from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import login
from hashlib import md5




@login.user_loader
def load_user(id):
    return User.query.get(int(id))




class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    createdProjects = db.relationship('Project', backref='author', lazy='dynamic')
    #person = db.relationship("Person", uselist=False, back_populates="person")
    person = db.relationship("Person")
    #about_me = db.Column(db.String(140))
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)

    def avatar(self, size):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return 'https://www.gravatar.com/avatar/{}?d=identicon&s={}'.format(
            digest, size)
    

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)    

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(64), index=True, unique=True)
    surName = db.Column(db.String(64), index=True, unique=True)
    gender = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    age = db.Column(db.Integer, index=True, unique=True)
    #user = db.relationship("User", back_populates="user" )
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    #allergier

    def __repr__(self):
        return '<Person {}>'.format(self.firstName + " " + self.surName +" : " + str(self.age))    

'''
allergyLink = db.Table("allergyLink",
    db.Column("person_id", db.Integer, db.ForeignKey("person.id"), primary_key=True),
    db.Column("allergy_id", db.Integer, db.ForeignKey("allergy.id"), primary_key=True) 
)

class Allergy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    info = db.Column(db.String(256), index=True, unique=True)

    def __repr__(self):
        return '<Allergy {}>'.format(self.name)
'''

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    #data = Column(JSON)

    def __repr__(self):
        return '<Post {}>'.format(self.body)

