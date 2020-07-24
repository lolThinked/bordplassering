from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    createdProjects = db.relationship('Project', backref='author', lazy='dynamic')
    #person = db.relationship("Person", uselist=False, back_populates="person")
    person = db.relationship("Person")

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


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    #data = Column(JSON)

    def __repr__(self):
        return '<Post {}>'.format(self.body)

