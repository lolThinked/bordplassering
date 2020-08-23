//Creates the preset div for presets menu
function generatePresetDOM(obj){
    let preDiv = document.createElement("div");
    preDiv.className = "saved-room";
    //preDiv.onclick = 'loadPresetByClick("event")';
    preDiv.onclick = loadPresetByClick;
    preDiv.id = obj.id;
    
    let imgEl = document.createElement("img");
    imgEl.src = "static/images/IDImages/"+obj.id+".png"; 
    imgEl.alt = obj.name;
    imgEl.id = obj.id;

    let textEl = document.createElement("h4");
    textEl.id = obj.id;
    textEl.innerHTML = obj.name;

    

    preDiv.appendChild(imgEl);
    preDiv.appendChild(textEl);
    if(obj.statistics != undefined){
        if(obj.statistics.gjester != undefined){
            let statisticsEl = document.createElement("h4");
            statisticsEl.innerHTML = "Gjester: " + obj.statistics.gjester.antall;
            preDiv.appendChild(statisticsEl);
        }
    }
    return preDiv;
}

//Generates deleting element
function generateDeleteDOM(obj){
    ///getData/specific/<identifier>
    let preDiv = document.createElement("div");
    preDiv.className = "saved-room";
    //preDiv.onclick = 'loadPresetByClick("event")';
    preDiv.onclick = removeFromDeletions;
    preDiv.id = obj.id;
    
    let imgEl = document.createElement("img");
    imgEl.src = "static/images/IDImages/"+obj.id+".png"; 
    imgEl.alt = obj.name;
    imgEl.id = obj.id;

    let textEl = document.createElement("h4");
    textEl.id = obj.id;
    textEl.innerHTML = obj.name;

    

    preDiv.appendChild(imgEl);
    preDiv.appendChild(textEl);
    if(obj.statistics != undefined){
        if(obj.statistics.gjester != undefined){
            let statisticsEl = document.createElement("h4");
            statisticsEl.innerHTML = "Gjester: " + obj.statistics.gjester.antall;
            preDiv.appendChild(statisticsEl);
        }
    }
    return preDiv;
}

function retrieveSpecificIdObject(id){
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:5000/getData/specific/"+id;
    url = "/getData/specific/"+id;
    xhr.open("GET", url, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            specificData = JSON.parse(xhr.response);
            console.log(typeof(overView));
            el = generateDeleteDOM(specificData);
            document.getElementById("for-deleting-presets-div").appendChild(el);
        }
    }
    xhr.send();
}

function removeFromDeletions(e){
    let idDeleteObject = e.target.id;
    for(let i =0; i<forDeleting.length; i++){
        if(forDeleting[i] === idDeleteObject){
            forDeleting.splice(i,1);
        }
    }
    updateforDeletingList();
}

function updateforDeletingList(){
    document.getElementById("for-deleting-presets-div").innerHTML ="";
    for(let i = 0; i<forDeleting.length; i++){
        retrieveSpecificIdObject(forDeleting[i]);
    }
    let presetsSaves = document.querySelectorAll(".saved-room-container > div");
    let forDeletingCopy = forDeleting.slice();
    for(let i=0; i<presetsSaves.length; i++){
        for(let j=0; j<forDeletingCopy.length; j++){
            if(presetsSaves[i].id ===forDeletingCopy[j]){
                //presetsSaves[i].style.display = "hidden";
                presetsSaves[i].style.visibility = "hidden";
                console.log(presetsSaves[i].style);
                forDeletingCopy.splice(i,1);
            }
        }
    }
    
}
//Fills up the presets tab with loaded presets
function loadPresets(objectData){
    //objectData = overView;
    /*
    let presetManehallenEL = document.getElementById("saved-manehallen-container");
    let presetSoylehallenEL = document.getElementById("saved-soylehallen-container");
    let presetHovedhallenEL = document.getElementById("saved-hovedhallen-container");
    let presetCafeEL = document.getElementById("saved-cafe-container");
    let listEL = [presetManehallenEL, presetSoylehallenEL ,presetHovedhallenEL, presetCafeEL];
    */
    let listEL = document.getElementsByClassName("saved-room-container");
    console.log(objectData);
    for(let i=0; i<listEL.length; i++){
        //console.log(listEL[i]);
        listEL[i].innerHTML = "";
    }
    for(let elem in objectData){
        let save = objectData[elem];
        //console.log(save);
        let createElement = generatePresetDOM(save);
        //console.log(createElement);
        if(save.room == "Manehallen"){
            listEL[0].appendChild(createElement);
        }else if(save.room == "Soylehallen"){
            listEL[1].appendChild(createElement);
        }else if(save.room == "Hovedhallen"){
            listEL[2].appendChild(createElement);
        }else if(save.room == "Cafe"){
            listEL[3].appendChild(createElement);
        }
    }
}
//Container Function for creating presets
function updatePresets(){
    retrieveOverview();
}


//Sends a list of Ids to be deleted 
function sendDeleteIds(listOfIds){
    let sendPackage = {"ids":listOfIds};
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:5000/delete";
    url = "/delete";
    xhr.open("POST", url, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            console.log(this.responseText);
            console.log("[RELOADING] - Presets menu!");
            updatePresets();
        }
    }
    xhr.send(JSON.stringify(sendPackage));
    //xhr.send(id);
    //xhr.send(sendPackage);
}

function createProjectWithDataButton(e){
    console.log(contextMatrix);
    previousEvent = e;
    setMouseCordinatesWithEvent(e);
    let roomP = document.getElementById("selected-room-for-project").innerHTML;
    if(roomP =="Ikke Valgt Enda"){
        return console.log("ERROR Room needs to be selected");
    }
    let nameP = document.getElementById("create-project-name-input").value;
    
    let dateP = document.getElementById("create-project-date-input").value;

    project = new Project(roomP, nameP);
    project.setDate(dateP);
    startTegner(roomP);
    //update(event);
    console.log(contextMatrix);
    createTestPersons();
    saveProjectData();

}