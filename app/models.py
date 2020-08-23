import app
from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import login
from hashlib import md5
import jwt
from time import time
#from flask_user import UserManager




@login.user_loader
def load_user(id):
    return User.query.get(int(id))




class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    #createdProjects = db.relationship('Project', backref='author', lazy='dynamic')
    #person = db.relationship("Person", uselist=False, back_populates="person")
    person = db.relationship("Person")
    about_me = db.Column(db.String(140), default="")
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)
    # Define the relationship to Role via UserRoles
    roles = db.relationship('Role', secondary='user_roles')
    projects = db.relationship('Project', secondary='user_projects')

    def avatar(self, size):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return 'https://www.gravatar.com/avatar/{}?d=identicon&s={}'.format(
            digest, size)
    

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    def hasRole(self, role):
        for eachRole in self.roles:
            if(eachRole.name == role):
                return True
        return False
    
    def isAdmin(self):
        for eachRole in self.roles:
            if(eachRole.name == "Admin"):
                return True
        return False
    def __repr__(self):
        return '<User {}>'.format(self.username)
    def get_reset_password_token(self, expires_in=600):
        return jwt.encode(
            {'reset_password': self.id, 'exp': time() + expires_in},
            app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')

    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, app.config['SECRET_KEY'],
                            algorithms=['HS256'])['reset_password']
        except:
            return
        return User.query.get(id)

# Define the Role data-model
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)
# Define the UserRoles association table
class UserRoles(db.Model):
    __tablename__ = 'user_roles'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer(), db.ForeignKey('roles.id', ondelete='CASCADE'))

#roles = db.relationship('Role', secondary='user_roles')
#projects = db.relationship('Project', secondary='user_projects')
# Define the Role data-model

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(128), unique=True, default="")
    projectLink = db.Column(db.String(128), unique=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
# Define the UserRoles association table
class UserProjects(db.Model):
    __tablename__ = 'user_projects'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE'))
    project_id = db.Column(db.Integer(), db.ForeignKey('projects.id', ondelete='CASCADE'))


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
'''
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    #data = Column(JSON)

    def __repr__(self):
        return '<Post {}>'.format(self.body)
'''



