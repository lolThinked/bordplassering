from flask import Flask, render_template, jsonify, url_for, send_from_directory, request
from flask_login import LoginManager
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
from flask_mail import Mail


import json
import os




app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

#from mail import

login = LoginManager(app)
login.login_view = "login"
mail = Mail(app)
from app import routes, models, errors

#login_manager.init_app(app)

#print(app)
#print(os.getcwd())

from app import app, db
from app.models import User, Person, Role
from app.models import Project
from flask_user import UserManager
#user_manager = UserManager(app, db, User)


@app.shell_context_processor
def make_shell_context():
    print("TESTING")
    return {'db': db, 'User': User, 'Person':Person, "Role":Role,"Project":Project }
#'Project': Project

if not app.debug:
    if app.config['MAIL_SERVER']:
        auth = None
        if app.config['MAIL_USERNAME'] or app.config['MAIL_PASSWORD']:
            auth = (app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
        secure = None
        if app.config['MAIL_USE_TLS']:
            secure = ()
        mail_handler = SMTPHandler(
            mailhost=(app.config['MAIL_SERVER'], app.config['MAIL_PORT']),
            fromaddr='no-reply@' + app.config['MAIL_SERVER'],
            toaddrs=app.config['ADMINS'], subject='Microblog Failure',
            credentials=auth, secure=secure)
        mail_handler.setLevel(logging.ERROR)
        app.logger.addHandler(mail_handler)
        
    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/microblog.log', maxBytes=10240,
                                       backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)

    app.logger.setLevel(logging.INFO)
    app.logger.info('Microblog startup')

'''
#global overView = {}
#global idList = []
global overView
global idList



def initializeMemoryData():
    print("[INITILIAZING] - Local data to Memory (overview, idlist)")
    filesize = os.path.getsize("Saved/overView.json")
    with open("Saved/overView.json", "r") as f:
        if(filesize !=0):
            overView = json.load(f)
            return overView
    print("[OVERVIEW] - Complete!")

def initializeIDList():
    filesize = os.path.getsize("Saved/idList.txt")
    with open("Saved/idList.txt", "r") as inList:
        #listIDS = list(inList)
        listIDS = [line.rstrip('\n') for line in inList]
        #print(listIDS)
    print("[IDLIST] - Complete!")
    print("[INITIALIZATION] - Done!")
    return listIDS


overView = initializeMemoryData()
idList = initializeIDList()
#print(idList)
#print(overView)
'''




##############                   For Compiling Only               ###########################
if __name__ =='__main__':
    app.run(host='0.0.0.0',port=5000)
    #app.run(debug=True)
    #threading.Thread(target=app.run).start()
##############                   For Compiling Only               ###########################


#app.run(host='0.0.0.0',port=5000)
