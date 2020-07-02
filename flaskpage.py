from flask import Flask, render_template, jsonify, url_for, send_from_directory, request
import json
import os
app = Flask(__name__)




overView = {}
idList = []


def initializeMemoryData():
    print("[INITILIAZING] - Local data to Memory (overview, idlist)")
    #print("[OVERVIEW] - Loading...")
    filesize = os.path.getsize("Saved/overView.json")
    with open("Saved/overView.json", "r") as f:
        if(filesize !=0):
            overView = json.load(f)
    print("[OVERVIEW] - Complete!")


    #print("[IDLIST] - Loading...")
    filesize = os.path.getsize("Saved/idList.txt")
    with open("Saved/idList.txt", "r") as f:
        for ids in f:
            idList += ids
    print("[IDLIST] - Complete!")
    print("[INITIALIZATION] - Done!")


initializeMemoryData()

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
    #print(dic)
    print("[SAVING] - as json")
    saveJsonSave(dic)
    print("[UPDATING] - Overview")
    updateJsonOverview(dic)
    return jsonify(message = "OK")


@app.route("/loadJsonSave", methods=["post"])
def loadJsonSave():
    inData = request.data
    #print(inData)
    dic = eval(inData)
    print(dic)
    return openJsonSave(dic["id"])


@app.route("/getData/idList")
def sendIdList():
    return idList

@app.route("/getData/overView")
def sendOverview():
    return overView


#hent ikon
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')








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
    overView[identifier] = jsonData
    filesize = os.path.getsize("Saved/overView.json")
    print("[PRINT] - IDLIST:")
    print(idList)
    print("[PRINT] - OVERVIEW:")
    print(overView)
    data = {

    }
    with open("Saved/overView.json", "w") as f:
        if(filesize !=0):
            print("[FILESIZE] : ")
            print(filesize)
            print("[TYPE OF]: 'f' ")
            print(type(f))
            data = json.load(f)
        #print(type(identifier))
        #print(type(jsonData))
        data[identifier] = jsonData
        json.dump(data, f)
    with open("Saved/idList.txt", "w") as f:
        f.write(identifier+'\n')

    
        





##############                   For Compiling Only               ###########################
if __name__ =='__main__':
    app.run(host='0.0.0.0',port=5000)
    #app.run(debug=True)
    #threading.Thread(target=app.run).start()
##############                   For Compiling Only               ###########################



