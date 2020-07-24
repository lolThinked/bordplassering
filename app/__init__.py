from flask import Flask, render_template, jsonify, url_for, send_from_directory, request
from flask_login import LoginManager
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


import json
import os



app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes, models
login_manager = LoginManager()
#login_manager.init_app(app)

#print(app)
#print(os.getcwd())

from app import app, db
from app.models import User, Project, Allergy, Person

@app.shell_context_processor
def make_shell_context():
    print("TESTING")
    return {'db': db, 'User': User, 'Project': Project, 'Person':Person, 'Allergy':Allergy}



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
