from flask import Flask, render_template, jsonify, url_for, send_from_directory, request
import json
import os

from threading import Thread
#from python.screenshot import getScreenshotFromID
from selenium import webdriver 
from selenium.webdriver.chrome.options import Options

from base64 import decodestring, decodebytes
import base64



app = Flask(__name__)




overView = {}
idList = []



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

#HOME DEFAULT ROUTE
@app.route("/")
@app.route("/index")
def home():
    return render_template("index_flaskpage.html", obj=0)

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
  return render_template("index_flaskpage.html", obj=overView[identifier])


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
    with open(r"static/images/IDImages/"+id+".png", 'wb') as f:
        f.write(canvas_png)
    print("[SCREENSHOT] - Done! ('static/images/IDImages/"+id+".png')")
    '''
    base64Image = driver.find_element_by_xpath('//*[@id="screenshots-container-inner"]/img').get_attribute("src")
    #print(base64Image)
    #print(bytes(base64Image, "utf-8"))
    #base64Image.encode()
    #base64Image = bytes(base64Image,"utf-8")
    print(base64Image)
    base64Image += "======"
    #base64Image = bytes(base64Image, "ASCII")
    code = base64.b64decode(base64Image)
    print(base64Image)
    print(code)
    with open("static/images/IDImages/imageToSave.png", "wb") as fh:
        fh.write(base64Image.decode('base64'))
    try:    
        enc1 = base64.encodebytes(base64Image)
        print(type(enc1))
    except Exception as e: 
        print(e)
    try:
        enc2 = base64.decodebytes(base64Image)
        print(type(enc2))
    except Exception as e: 
        print(e)
    try:
        enc3 = base64.b64decode(base64Image)
        print(type(enc3))
    except Exception as e: 
        print(e)
    
    
   

    try:
        with open("static/images/IDImages/imageToSave.png","wb") as f:
            #pass
            f.write(base64.b64decode(base64Image))
            #f.write(decodestring(base64Image))
    except Exception as e: 
        print(e)
    
        print("[SAVING] - Falied(Base64 to Png encoding failed!")
    #screenshot = driver.save_screenshot('Saved/IDImages/'+id+'.png') 
    screenshot = driver.save_screenshot('static/images/IDImages/'+id+'.png') 
    driver.quit()
    print("[SCREENSHOT] - Done!")
    '''



##############                   For Compiling Only               ###########################
if __name__ =='__main__':
    app.run(host='0.0.0.0',port=5000)
    #app.run(debug=True)
    #threading.Thread(target=app.run).start()
##############                   For Compiling Only               ###########################



