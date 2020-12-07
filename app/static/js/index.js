var bodyEl = document.querySelector("body");


var backgroundImg = false;
canvasEl = document.querySelector(".canvas");
ctx = canvasEl.getContext("2d");

backgroundCanvasEl = document.getElementById("backgroundCanvas");
backgroundCTX = backgroundCanvasEl.getContext("2d");

initializeListeners();
let newAppEL = document.getElementById("new-app");
let newAppMenuEL = document.getElementById("new-content");
newAppGUIEl = document.getElementById("new-GUI");


//TABLE PREVIEW
//let tableCanvas = document.querySelector(".tablePreview");
//let tblctx = tableCanvas.getContext("2d");
let tblPreview = false;
var teller = 0;
//var gui = document.getElementById("canvasGui");
//var counterEl = document.getElementById("statistics");
canvasEl.addEventListener('DOMMouseScroll',scaler,false);
canvasEl.addEventListener('mousewheel',scaler,false);
document.addEventListener("keydown", checkKey);
document.addEventListener("keyup", checkKey);

if("ontouchstart" in document.documentElement){
    canvasEl.addEventListener("ontouchstart", setBord);
    canvasEl.addEventListener("ontouchmove", update);
    canvasEl.addEventListener("ontouchend", deleteBord);
    console.log("your device is a touch screen device.");
}else{
    console.log("your device is NOT a touch device");
    canvasEl.addEventListener("mousemove", update);
    canvasEl.addEventListener("mousedown", setBord);
    canvasEl.addEventListener("mouseup", deleteBord);
}
let farge = "red";
let forrigeFargeDiv = 0;




var bord = [];
let drawingObjects = bord;
var obstacles = [];
let drawLater = [];
let skrapeMerker = document.getElementById("skrapeMerker");







window.addEventListener("resize", changeWindowSizeFunction);

console.log(contextMatrix);



function returnDiv(e){
    var currentDiv = e.path[e.path.length-8];
    if(forrigeFargeDiv != 0){
        forrigeFargeDiv.style.backgroundColor = "";
    }
    if(currentDiv != undefined && currentDiv.className != "EmptyRomTekst"){
        romTekst.innerHTML = currentDiv.className.substr(5);
        let divForChange = document.getElementsByClassName(currentDiv.className);
        //console.log(divForChange[0].style.backgroundColor);
        //divForChange[0].style.backgroundColor = "rgb(74, 105, 126)";
        let svgDiv = divForChange[0].getElementsByTagName("svg");
        //console.log(svgDiv);
        svgDiv[0].style.backgroundColor = "rgb(74, 105, 126)";
        
        forrigeFargeDiv = svgDiv[0];
        bodyEl.style.cursor ="pointer";

        //console.log(currentDiv);
    }else{
        romTekst.innerHTML = "Velg Rom";
        bodyEl.style.cursor ="default";
    }
}
//Velger Lokalet
function velgLokalet(e){
    var currentDiv = e.path[e.path.length-8];
    console.log(e);
    if(currentDiv != undefined && currentDiv.className != "EmptyRomTekst" && currentDiv.className != "EmptyLagring"){
        startTegner(currentDiv.className.substr(5));
        console.log(currentDiv);
    }
}

function startTegner(navn){
    /*
    //
    canvasEl = document.querySelector(".canvas");
    ctx = canvasEl.getContext("2d");
    setCanvasVariables();
    currentRoom = navn;
    setCurrentRoomPointer(navn);
    initializeRoom(navn);
    newAppMenuEL.style.display ="none";
    //backgroundImg = document.getElementById("background");
    bodyEl.style.overflow =  "hidden"; 
    canvasEl.style.display = "block";
    
    console.log(navn);
    //document.querySelector(".currentHall").innerHTML = "<h1>"+ navn + "</h1>";
    translate(1,1);
    translateToCenter(currentRoomPointer);
    //callUpdateOnFPSCall(16);
    setRandomTableDescriptors();
    //console.log(transformX + " : " + transformY);
    document.getElementById("new-GUI").style = "";
    setCanvasSize();
    
    update();
    */
    console.log("[PRINTING] (CTXMTRX, MOUSEX)");
    console.trace();
    console.log(contextMatrix);
    console.log(mouseX);
    setupCanvas(navn);
    setupCSSForDrawing();
    //pushTestTables();
    /*
    if(navn =="Manehallen"){
        bord = [];
        loadTables(tablesListObject);
    }
    */ 
    guiUpdate();
    update();
    //scaleToScreen(); //Because of css bug
    console.log("[PRINTING] (MOUSEX, CANVAS_EL)");
    console.log(mouseX);
    console.log(canvasEl);
    
}





function pushTestTables(){
    bord.push(new Bord(200, 400, "langbord", 30, "A"));
    bord.push(new Bord(300, 400, "langbord", 30, "B"));
    bord.push(new Bord(400, 400, "langbord", 30, "C"));
    bord.push(new Bord(500, 400, "langbord", 30, "D"));
}

function setBord(e){
    
    e = e || previousEvent;
    mouseIsPressed = true;
    console.log(e);
    //console.log(bord);
    setMouseCordinatesWithEvent(e);
    var loopLength = bord.length;
    tblPreview = false;
    
    clickOriginX = mouseX;
    clickOriginY = mouseY;
    selectPoint(mouseX, mouseY);
    //if(e.target)
    //setNameForTableInInputField();
    //drawTablePreview();
    setDistanceForSelected(mouseX, mouseY);
    //console.log(exportTableSetup());
    //console.log(ctx.getTransform());
    
    update(e);
}

function update(e){
    e = e || previousEvent;
    //ctx.clearRect(-window.innerWidth,-window.innerHeight, window.innerWidth*4, window.innerHeight*4);
    ctx.strokeStyle = 'white';
    mouseX = (e.clientX/contextMatrix[0])-contextMatrix[4]/contextMatrix[0];
    mouseY = (e.clientY/contextMatrix[3])-contextMatrix[5]/contextMatrix[3];
    let diffX = mouseX-clickOriginX, diffY = mouseY-clickOriginY;
    if(mouseIsPressed && selected.length==0 && !shiftIsPressed){
        translateBackground(e);
    }
    

    if(tableInSelectedGroup && mouseIsPressed){
        for(tables in selected){
            selected[tables].updatePositionNEW(mouseX, mouseY);
            //selected[tables].updatePositionBy(diffX, diffY);
        }
        addTableStacking =0;
    }
    tblPreview =false;
    let checkIfTableCheck = checkIfTable(mouseX, mouseY);
    //Change mouse to pointer if over table
    if(checkIfTableCheck && !mouseIsPressed){
        canvasEl.style.cursor = "grab";
    }else if(checkIfTableCheck!= true){
        if(mouseIsMove != true){
            canvasEl.style.cursor = "move";
        }
        if(shiftIsPressed){
            canvasEl.style.cursor ="crosshair";
        }
    }else if(checkIfTableCheck && mouseIsPressed){
        canvasEl.style.cursor ="grabbing";
    }
    //drawTablePreview();

    //TRANSLATE canvas if "ctrl" and no table is selected
    /*
    if(mouseIsMove && mouseIsPressed){
        translateBackground(e);
    }
    */
    
    

    
    //SELECT AREA
    if(!mouseIsMove && !tableInSelectedGroup && mouseIsPressed){
        selectArea(clickOriginX, clickOriginY, mouseX, mouseY);
    }
    if(shiftIsPressed && mouseIsPressed && !tableInSelectedGroup){
        selectArea(clickOriginX, clickOriginY, mouseX, mouseY);
    }
    
    
    var loopLength = bord.length;
    for(var i =0; i<loopLength; i++){
        checkIfInSelecting(bord[i]);
        checkIfInSelected(bord[i]);
        //bord[i].drawMyself();
        //counterForStats += bord[i].returnNumberOfSeats();
    }
  


    var loopLength = bord.length;
    farge = "red";
    for(var i =0; i<loopLength; i++){
        var checkerSelfer = bord[i].checkSelf((e.clientX-contextMatrix[4])/contextMatrix[0], (e.clientY-contextMatrix[5])/contextMatrix[3]);
        if(checkerSelfer != false){
            farge = "green";
        }
    }
    
    ctx.fillText("-", ((e.clientX/contextMatrix[0])-contextMatrix[4]/contextMatrix[0]), ((e.clientY/contextMatrix[3])-contextMatrix[5]/contextMatrix[3]));

    
    /*
    var d = new Date();
    var n = d.getTime();
    let timeDiff = n-previousTime;
    previousTime = n;
    */
    //counterEl.innerHTML = "<h1>"+ timeDiff + "</h1>";
    //counterEl.innerHTML = "<h1>FPS : " + fpsCounter(timeDiff) + "</h1>";
    //fpsCounter(timeDiff);
    previousEvent = e;
   
    drawFrame();
   
    //getStats();
    //pushStats();
    //pushStatsFast();
    //createProjectInfoGUI();
    //updateProjectInfoGUI();
    
    myWorker.postMessage("updateGui");    
}

myWorker.onmessage = function(e) {
    result.textContent = e.data;
    console.log('Message received from worker');
  }
function deleteBord(e){
    mouseIsPressed = false;
    addPersonToTable();
    addSelectingToSelected();
    
    translationLimit();
    redraw();
    drawFrame();
    
}




// //CHECKING COLITIONS
    // drawLater = [];
    // checkEveryColition();
    // //RED
    // ctx.fillStyle = farge;
    // //ctx.fillRect(((e.clientX)-contextMatrix[4]), ((e.clientY)-contextMatrix[5]), 20, 20);
    // ctx.lineWidth = "7";
    // ctx.fillRect(((e.clientX/contextMatrix[0])-contextMatrix[4]/contextMatrix[0]), ((e.clientY/contextMatrix[3])-contextMatrix[5]/contextMatrix[3]), 20, 20);
    // ctx.strokeRect(((e.clientX/contextMatrix[0])-contextMatrix[4]/contextMatrix[0]), ((e.clientY/contextMatrix[3])-contextMatrix[5]/contextMatrix[3]), 24, 24);
    // ctx.font = "25px Arial";
    // ctx.fillText((((e.clientX/contextMatrix[0])-contextMatrix[4]/contextMatrix[0]).toFixed(0) +" : "+ ((e.clientY/contextMatrix[3])-contextMatrix[5]/contextMatrix[3]).toFixed(0)), ((e.clientX/contextMatrix[0])-contextMatrix[4]/contextMatrix[0]), ((e.clientY/contextMatrix[3])-contextMatrix[5]/contextMatrix[3]));
    // ctx.fillStyle = farge;
    // ctx.fillStyle = "white";
    // //Center
    // ctx.fillRect(((ctx.canvas.width/2-contextMatrix[4])/contextMatrix[0]), ((ctx.canvas.height/2-contextMatrix[5])/contextMatrix[0]), 20, 20);
    // for(var i = 0; i<drawLater.length; i++){
    //     //console.log(drawLater[i][0]);
    //     //bord[drawLater[i][0]].drawMyself();
    // }
    // drawTablePreview();