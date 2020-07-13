function turnTableQuarter(table){
    if(!table){
        let table = tblPreview;
        if(tblPreview !== false && tblPreview !== undefined){
            console.log(table.returnId());
            table.turnRight();
        }
        redraw();
        return
    }
    if(tblPreview !== false && tblPreview !== undefined){
        table.turnRight();
    }
    redraw();
    update();
}

function deleteTableOUTDATED(table){
    if(!table){
        let table =tblPreview;
        let forLength = bord.length;
        for(var i =0; i<forLength; i++){
            if(bord[i].returnId() === table.returnId()){
                bord.splice(i,1);
            }
        }
        redraw();
        return
    }
    let forLength = bord.length;
    for(var i =0; i<forLength; i++){
        if(bord[i].returnId === table.returnId){
            bord.splice(i,1);
        }
    }
    redraw();
}
function rotateTableAngle(angle, table){
    if(!table){
        let table = tblPreview;
        if(tblPreview !== false && tblPreview !== undefined){
            table.rotate(angle);
        }
        update();
        return
    }
    if(tblPreview !== false && tblPreview !== undefined){
        table.rotate(angle);
    }
    update();
}




function newContentHeaderMenuSetActive(evt){
    let contentHeaderEL = document.querySelectorAll("#new-content-header-menu > a");
    let contentMenuEL = document.querySelectorAll("#new-content-menu > div");
    let savedI;
    for(let i =0; i<contentHeaderEL.length; i++){
        contentHeaderEL[i].className = "";
        if(evt.target.id === contentHeaderEL[i].id){
            savedI = i;
        }
        contentMenuEL[i].style="display: none;";
    }
    evt.target.className = "active";
    contentMenuEL[savedI].style = "";
    //UPDATE PRESETS LIST
    if(contentMenuEL[savedI].className == "saved-setups"){
        updatePresets();
    }
}

function goHome(){
    bodyEl.style.overflow =  "visible"; 
    document.getElementById("new-content").style = "";
    document.getElementById("new-GUI").style.display = "none";
    canvasEl.style.display = "none";
    resetCanvasSettings();
}
function saveCurrentTableSetupToText(){
    let save;
    if(openSaveDialog() !== false){
        save = exportTableSetup();
    }else{
        return
    }
    sendSaveToServer(save);
}


//EDIT or LOAD MODE
function editOrLoad(){
    let visAtDuRedigererEl = document.getElementById("visAtDuRedigerer");
    if(editingModeDelete){//IF IN DELETING MODE
        editingModeDelete = false;
        visAtDuRedigererEl.innerHTML = "Last inn";
        visAtDuRedigererEl.style.backgroundColor = "#7cac73";
    }else{ //IF IN LOAD MODE

        editingModeDelete = true;
        visAtDuRedigererEl.innerHTML = "Sletting";
        visAtDuRedigererEl.style.backgroundColor = "#ac7373";
    }
}

//Deletes the selected tables
function confirmDeletePresets(){
    console.log("[DELETING] - Deleting selectedTable!");
    sendDeleteIds(forDeleting);
    forDeleting = [];
    updateforDeletingList();
}

//LOADS Preset or send delete message
function loadPresetByClick(e){
    console.log(e);
    //getLoadByID("1e3d");
    console.log(e.target.id);
    let id = e.target.id;
    
    if(!editingModeDelete){
        console.log("[LOADING] - save");
        loadNewPageFromPreset(id);
        console.log("[LOADED] - save");
    }else{

        e.target.style.display = "none";
        //console.log("[DELETING] - Deleting selectedTable!");
        sendList = [id];
        //sendDeleteIds(sendList);
        forDeleting.push(id);
        updateforDeletingList();
    }
}

//Open save dialog(MODAL)
function openSaveDialog(){
    let save = exportTableSetup();
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    updateSaveInfo(save);
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
      }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modalCancelBtnEL.onclick = function(){
        modal.style.display ="none";
    }    
}


//Takes Screenshot
function takeScreenshot(){
    let image = canvasEl.toDataURL("image/jpg");
    //"data:image/png;base64,"
    imageElement = document.createElement("img");
    //imageElement.src = "data:image/png;base64," + image;
    imageElement.src = image;
    imageElement.className = "screenshotElement";
    let screnSContainerEl = document.getElementById("screenshots-container-inner");
    screnSContainerEl.appendChild(imageElement);
    let lengde = document.getElementsByClassName("screenshotElement");
    for(let i = 0; i<lengde.length; i++){
        if(i == lengde.length-1){
            break;
        }
        lengde[i].style.display = "none";
    }
    console.log(image);
}

