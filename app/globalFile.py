import json
import os

global overView
global allergyOverview
global idList
global projectOverview

overView = {}
allergyOverview= {}
idList = []
projectOverview = {}

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

def initializeProjectOverview():
    print("[PROJECT ID LIST] INITIALIZING")
    pathA = os.path.exists("Saved/Projects/projectOverview.json")
    filesize = os.path.getsize("Saved/Projects/projectOverview.json")
    with open("Saved/Projects/projectOverview.json", "r") as f:
        if(filesize !=0):
            if(pathA):
                overView = json.load(f)
                return overView
    return {}
    print("[PROJECT] - Overview Loaded!")


def initializeAllergyOverview():
    pathA = os.path.exists("Saved/Allergy/overview.json")
    filesize = os.path.getsize("Saved/Allergy/overview.json")
    with open("Saved/Allergy/overView.json", "r") as f:
        if(filesize !=0):
            if(pathA):
                overView = json.load(f)
                return overView
    return {}
    print("[ALLERGY] - Overview Loaded!\n")
    
projectOverview = initializeProjectOverview()

overView = initializeMemoryData()
idList = initializeIDList()

allergyOverview = initializeAllergyOverview()
