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
            //console.log(table.returnId());
            table.rotate(angle);
        }
        //redraw();
        update();
        return
    }
    if(tblPreview !== false && tblPreview !== undefined){
        table.rotate(angle);
    }
    //redraw();
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
    //let save = exportTableSetup();
    if(openSaveDialog() !== false){
        save = exportTableSetup();
    }else{
        return
    }
    sendSaveToServer(save);
}