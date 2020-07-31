var bodyEl = document.querySelector("body");


var backgroundImg = false;
canvasEl = document.querySelector(".canvas");
ctx = canvasEl.getContext("2d");

initializeListeners();
let newAppEL = document.getElementById("new-app");
let newAppMenuEL = document.getElementById("new-content");


//TABLE PREVIEW
let tableCanvas = document.querySelector(".tablePreview");
let tblctx = tableCanvas.getContext("2d");
let tblPreview = false;
var teller = 0;
var gui = document.getElementById("canvasGui");
var counterEl = document.getElementById("statistics");
canvasEl.addEventListener('DOMMouseScroll',scaler,false);
canvasEl.addEventListener('mousewheel',scaler,false);
document.addEventListener("keydown", checkKey);
document.addEventListener("keyup", checkKey);
let farge = "red";
let forrigeFargeDiv = 0;




var bord = [];
var obstacles = [];
let drawLater = [];
canvasEl.addEventListener("mousemove", update(event));

canvasEl.addEventListener("mousedown", setBord(event));
canvasEl.addEventListener("mouseup", deleteBord());

canvasEl.addEventListener("ontouchstart", setBord(event));
canvasEl.addEventListener("ontouchmove", update(event));
canvasEl.addEventListener("ontouchend", deleteBord());

window.addEventListener("resize", changeWindowSizeFunction);





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
    setupCanvas(navn);
    setupCSSForDrawing();
    pushTestTables();
    if(navn =="Manehallen"){
        bord = [];
        loadTables(tablesListObject);
    } 
    guiUpdate();
    update();
    scaleToScreen();
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
    //console.log(e);
    //console.log(bord);
    mouseX = (e.clientX/contextMatrix[0])-contextMatrix[4]/contextMatrix[0];
    mouseY = (e.clientY/contextMatrix[3])-contextMatrix[5]/contextMatrix[3];
    var loopLength = bord.length;
    tblPreview = false;
    
    clickOriginX = mouseX;
    clickOriginY = mouseY;
    selectPoint(mouseX, mouseY);
    //setNameForTableInInputField();
    drawTablePreview();
    setDistanceForSelected(mouseX, mouseY);
    //console.log(exportTableSetup());
    console.log(ctx.getTransform());
    update(e);
}

function update(e){
    e = e || previousEvent;
    //ctx.clearRect(-window.innerWidth,-window.innerHeight, window.innerWidth*4, window.innerHeight*4);
    ctx.strokeStyle = 'white';
    mouseX = (e.clientX/contextMatrix[0])-contextMatrix[4]/contextMatrix[0];
    mouseY = (e.clientY/contextMatrix[3])-contextMatrix[5]/contextMatrix[3];
    let diffX = mouseX-clickOriginX, diffY = mouseY-clickOriginY;
    //CHECK SNAP OR MOVE TABLE
    

    if(tableInSelectedGroup && mouseIsPressed){
        for(tables in selected){
            selected[tables].updatePositionNEW(mouseX, mouseY);
            //selected[tables].updatePositionBy(diffX, diffY);
        }
        addTableStacking =0;
    }
    tblPreview =false;
    //Change mouse to pointer if over table
    if(checkIfTable(mouseX, mouseY) && !mouseIsPressed){
        canvasEl.style.cursor = "grab";
    }else if(checkIfTable(mouseX, mouseY)!= true){
        if(mouseIsMove != true){
            canvasEl.style.cursor = "default";
        }
    }else if(checkIfTable(mouseX, mouseY) && mouseIsPressed){
        canvasEl.style.cursor ="grabbing";
    }
    drawTablePreview();

    //TRANSLATE canvas if "ctrl" and no table is selected
    if(mouseIsMove && mouseIsPressed){
        //console.log("TESTING");
        translateBackground(e);
        
    }
    //ctx.drawImage(backgroundImg, scaleBilde*0.1 ,backgroundImg.height*0.1  , scaleBilde*0.8,backgroundImg.height*0.8);
    //redraw();
    
    let skrapeMerker = document.getElementById("skrapeMerker");
    //ctx.drawImage(skrapeMerker, 0 , 0, skrapeMerker.width, skrapeMerker.height);
    for(var i = 0; i<obstacles.length; i++){
        //obstacles[i].drawMyself();
        //console.log(obstacles);
    }

    
    //SELECT AREA
    if(!mouseIsMove && !tableInSelectedGroup && mouseIsPressed){
        selectArea(clickOriginX, clickOriginY, mouseX, mouseY);
    }
    
    var loopLength = bord.length;
    var counterForStats=0;
    for(var i =0; i<loopLength; i++){
        checkIfInSelecting(bord[i]);
        checkIfInSelected(bord[i]);
        //bord[i].drawMyself();
        counterForStats += bord[i].returnNumberOfSeats();
    }
    //counterEl.innerHTML = "<h1>0/"+counterForStats+"</h1>";

   


    var loopLength = bord.length;
    farge = "red";
    for(var i =0; i<loopLength; i++){
        var checkerSelfer = bord[i].checkSelf((e.clientX-contextMatrix[4])/contextMatrix[0], (e.clientY-contextMatrix[5])/contextMatrix[3]);
        if(checkerSelfer != false){
            farge = "green";
        }
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

    var d = new Date();
    var n = d.getTime();
    let timeDiff = n-previousTime;
    previousTime = n;
    //counterEl.innerHTML = "<h1>"+ timeDiff + "</h1>";
    counterEl.innerHTML = "<h1>FPS : " + fpsCounter(timeDiff) + "</h1>";
    //fpsCounter(timeDiff);
    previousEvent = e;
    drawFrame();
    //getStats();
    //pushStats();
    //pushStatsFast();
}

function deleteBord(e){
    mouseIsPressed = false;
    addSelectingToSelected();
    
    translationLimit();
    redraw();
    drawFrame();
    
}