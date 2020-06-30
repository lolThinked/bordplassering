from flask import Flask, render_template, jsonify, url_for, send_from_directory, request
import json
import os
app = Flask(__name__)

def hentJson(navn):
    with open("jsonFiles/" + navn + ".json", "r") as f:
        minInfo = json.load(f)
    return minInfo



#HOME DEFAULT ROUTE
@app.route("/")
@app.route("/index")
def home():
    return render_template("index_flaskpage.html")

@app.route("/save", methods=["post"])
def saveData():
    inData = request.data
    #print(inData)
    dic = eval(inData)
    print(dic)
    return jsonify(message = "OK") 


#json function
@app.route("/champselect/json")
def champselectJson():
    jsonFile = hentJson("minInfo")
    return jsonify(jsonFile)


#hent ikon
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')








def saveDataLocally(dicSave):
    #SAVE
    pass




##############                   For Compiling Only               ###########################
if __name__ =='__main__':
    app.run(host='0.0.0.0',port=5000)
    #app.run(debug=True)
    #threading.Thread(target=app.run).start()
##############                   For Compiling Only               ###########################
