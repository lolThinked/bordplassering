from app import app, db
from flask import Flask, render_template, jsonify, url_for, send_from_directory, request, flash, redirect
from app.forms import LoginForm, RegistrationForm, EditProfileForm, ResetPasswordRequestForm, ResetPasswordForm

#from flask_login import LoginManager
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Project, Person
from werkzeug.urls import url_parse
from datetime import datetime

import json
import os

from threading import Thread
from selenium import webdriver 
from selenium.webdriver.chrome.options import Options

from base64 import decodestring, decodebytes
import base64

from app.globalFile import overView, idList, projectOverview, allergyOverview
from app.email import send_password_reset_email


@app.before_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
        db.session.commit()


#HOME DEFAULT ROUTE
@app.route("/index")
@app.route("/")
@login_required
def index():
    #print(os.getcwd())
    #print(os.path.exists("templates/index_flaskpage.html"))
    liste = makeListFromOverview(projectOverview)
    #print(liste)
    return render_template("index_flaskpage.html", obj=0, user= current_user,projects=liste)



@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

@app.route('/edit_profile', methods=['GET', 'POST'])
@login_required
def edit_profile():
    form = EditProfileForm(current_user.username)
    if form.validate_on_submit():
        current_user.username = form.username.data
        current_user.about_me = form.about_me.data
        db.session.commit()
        flash('Your changes have been saved.')
        return redirect(url_for('edit_profile'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', title='Edit Profile',
                           form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/reset_password_request', methods=['GET', 'POST'])
def reset_password_request():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = ResetPasswordRequestForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            send_password_reset_email(user)
        flash('Check your email for the instructions to reset your password')
        return redirect(url_for('login'))
    return render_template('reset_password_request.html',
                           title='Reset Password', form=form)

@app.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    user = User.verify_reset_password_token(token)
    if not user:
        return redirect(url_for('index'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user.set_password(form.password.data)
        db.session.commit()
        flash('Your password has been reset.')
        return redirect(url_for('login'))
    return render_template('reset_password.html', form=form)



@app.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    posts = [
        {'author': user, 'body': 'Test post #1'},
        {'author': user, 'body': 'Test post #2'}
    ]
    return render_template('user.html', user=user, posts=posts)

@app.route('/myPage')
def myPage():
    return render_template("index_flaskpage.html", obj=0, user= current_user)



@app.route("/save", methods=["post"])
def saveData():
    inData = request.data
    #print(inData)
    dic = eval(inData)
    #print(dic)
    print("[SAVING] - as json")
    saveJsonSave(dic)
    print("[UPDATING] - Overview")
    updateJsonOverview(dic)
    return jsonify(message = "OK")


@app.route("/delete", methods=["POST"])
def deleteSaveList():
    dic  = eval(request.data)
    print(dic)
    for save in dic["ids"]:
        deleteSave(save)
    return jsonify(message = "DELETED")


@app.route("/loadJsonSave", methods=["post"])
def loadJsonSave():
    inData = request.data
    #print(inData)
    dic = eval(inData)
    print(dic)
    return openJsonSave(dic["id"])


@app.route('/<identifier>')
def found(identifier):
  return render_template("index_flaskpage.html", obj=overView[identifier],user= current_user)


@app.route("/getData/idList")
def sendIdList():
    return idList

@app.route("/getData/overView")
def sendOverview():
    return overView

@app.route("/getData/specific/<identifier>")
def getSpecificIdentifier(identifier):
    return overView[identifier]

@app.route("/getData/person/<identifier>")
def getPersonByIdentifier(identifier):
    if(os.path.exists("Saved/Person/"+identifier+".json")):
        with open("Saved/Person/"+identifier+".json", "r") as f:
            jsonData =json.load(f)
            return jsonData


@app.route("/project/save/<identifier>", methods=["post"])
def saveProjectWithIdentifier(identifier):
    jsonData = eval(request.data)
    #updateProjectList
    print(jsonData)
    print(projectOverview)
    projectOverview[identifier] = jsonData["project"]
    with open("Saved/Projects/projectOverview.json", "w") as f:
        json.dump(projectOverview, f)
    #makeFolder
    createFolder("./Saved/Projects/"+identifier)
    createFolder("./Saved/Projects/"+identifier+"/Person")
    #makeProjectFile
    with open("Saved/Projects/"+identifier+"/project.json", "w") as f:
        json.dump(jsonData["project"], f)
    #makeDrawingFiles
    with open("Saved/Projects/"+identifier+"/drawing.json", "w") as f:
        json.dump(jsonData["drawing"], f)
    #makePeopleFiles
    for person in jsonData["guests"]:
        with open("Saved/Person/"+person["id"]+".json", "w") as f:
            print(person)
            json.dump(person, f)
        with open("Saved/Projects/"+identifier+"/Person/"+person["id"]+".json", "w") as f:
            #print(person)
            json.dump(person, f)
    print("\n[PROJECT] - SAVED!")
    return jsonify(message = "Saved!")

@app.route("/project/getAll")
def getProjectOverview():
    with open("Saved/Projects/projectOverview.json","r") as f:
        return json.load(f)

@app.route("/project/load/<identifier>")
def getProjectById(identifier):
    projectData ={}
    with open("Saved/Projects/"+identifier+"/project.json", "r") as f:
        projectData["project"] = json.load(f)
    with open("Saved/Projects/"+identifier+"/drawing.json", "r") as f:
        projectData["drawing"] = json.load(f)
    projectData["guests"] = []
    guestList = projectData["project"]["guests"]
    for guest in guestList:
        gjest = guest
        #projectData["guests"].append(retrieveGuestFromId(guest))
        projectData["guests"].append(retrieveProjectGuestFromId(guest, identifier))
    #print(guestList)
    return projectData


@login_required
@app.route("/project/")
@app.route("/project/<identifier>")
def loadProjectHtml(identifier):
    return redirect(url_for('index'))



@app.route("/saveData/allergy/<identifier>", methods=["post"])
def saveAllergyWithIdentifier(identifier):
    inData = request.data
    #print(inData)
    jsonData = eval(inData)
    allergyOverview[identifier] = jsonData
    with open("Saved/Allergy/overview.json", "w") as f:
        json.dump(allergyOverview, f)
    '''
    with open("Saved/Allergy/"+jsonData["id"]+".json", "w+") as f:
        json.dump(jsonData, f)
    if(os.path.exists("Saved/Allergy/list.txt")):
        with open("Saved/Allergy/list.txt", "a") as f:
            #listIDS = [line.rstrip('\n') for line in f]
            f.write(identifier + "\n")
    '''
    return jsonify(message = "OK")

@app.route("/getData/allergy/all")
def getAllergyAll():
    return allergyOverview

#hent ikon
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')






def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print ('Error: Creating directory. ' +  directory)

def saveDataLocally(dicSave):
    #SAVE
    pass

def openJsonSave(identifier):
    with open("Saved/"+identifier+".json") as f:
        jsonData = json.load(f)
        return jsonData

def saveJsonSave(jsonData):
    with open("Saved/"+jsonData["id"]+".json", "w") as f:
        json.dump(jsonData, f)



def updateJsonOverview(jsonData):
    identifier = jsonData["id"]
    idList.append(identifier)
    process = Thread(target=getScreenshotFromID, args=[identifier])
    process.start()
    #getScreenshotFromID(identifier)
    overView[identifier] = jsonData
    filesize = os.path.getsize("Saved/overView.json")
    print("[PRINT] - IDLIST:")
    print(idList)
    print("[PRINT] - OVERVIEW:")
    print(overView)
    saveOverviewAndIdList()

def saveOverviewAndIdList():
    print("[SAVING] - (overView.json, idList.txt)")
    with open("Saved/overView.json", "w") as f:
        json.dump(overView, f)
    with open("Saved/idList.txt", "w") as f:
        for ids in idList:
            f.write(ids+'\n')

def deleteSave(save):
    identifier = save
    print("[DELETE] - Deleting: {" +identifier +"} from system!")
    print("[UPDATING] - (idList, overView)")
    try:
        idList.remove(identifier)
    except Exception as e: 
        print(e)
        print("[DELETE] - FAILED(idList)")
    try:
        overView.pop(identifier)
    except Exception as e: 
        print(e)
        print("[DELETE] - FAILED(overView)")
        
    #JSON SAVE
    jsonPath = "Saved/"+str(identifier)+".json"
    if(os.path.exists(jsonPath)):
        os.remove(jsonPath)
    print("[DELETE] - Saved/"+identifier+".json -  REMOVED!")

    #IMAGE SAVE
    imagePath = "static/images/IDImages/"+str(identifier)+".png"
    if(os.path.exists(imagePath)):
        os.remove(imagePath)
    print("[DELETE] - static/images/IDImages/"+identifier+".png -  REMOVED!")

    saveOverviewAndIdList()

    



def getScreenshotFromID(id):
    print("[SCREENSHOT] - Running...")
    #SCREENSHOT FUNCTION
    DRIVER = 'chromedriver'
    chrome_options = Options()
    chrome_options.add_argument("--window-size=1920,1080")
    driver = webdriver.Chrome(DRIVER, chrome_options=chrome_options)
    #SCREENSHOT FUNCTION
    print(["[SCREENSHOT] - taking screenshot of save"])
    driver.get('http://localhost:5000/'+id)
    driver.find_element_by_id("takeScreenshotButton").click()
    #base64Image = driver.find_element_by_css_selector("screenshotElement")
    print("[WEBSCRAPER] - getting canvas Element (chromium)!")
    canvas = driver.find_element_by_css_selector("#canvas")
    # get the canvas as a PNG base64 string
    print("[WEBSCRAPER] - Executing script (chromium)!")
    canvas_base64 = driver.execute_script("return arguments[0].toDataURL('image/png').substring(21);", canvas)
    # decode
    print("[WEBSCRAPER] - Decoding(PNG)")
    canvas_png = base64.b64decode(canvas_base64)
    print("[WEBSCRAPER] - DONE!")
    driver.quit()
    #print(canvas_base64)
    # save to a file
    with open(r"app/static/images/IDImages/"+id+".png", 'wb') as f:
        f.write(canvas_png)
    print("[SCREENSHOT] - Done! ('static/images/IDImages/"+id+".png')")

def makeListFromOverview(overviewInput):
    #print(overviewInput)
    liste = []
    for item in overviewInput:
        liste.append(overviewInput[item])
    #print(liste)
    return liste

def retrieveGuestFromId(id):
    with open("Saved/Person/"+id+".json","r") as f:
        data = json.load(f)
        return data
def retrieveProjectGuestFromId(id, projectId):
    with open("Saved/Projects/"+projectId+"/Person/"+id+".json","r") as f:
        data = json.load(f)
        return data