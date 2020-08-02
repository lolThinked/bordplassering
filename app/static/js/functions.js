function initializeListeners(){
    
    
}






function checkKey(e){
    e = e || window.event;
    let key = e.key;
    if(!checkIfInType()){
            //console.log(e);
        if(key =="."){
            //console.log(bord);
            selectPoint(mouseX, mouseY);
            console.log("CALLSFUNCTION");
        }
        if(key =="Shift"){
            if(e.type==="keydown"){
                shiftIsPressed = true;
            }else if(e.type ==="keyup"){
                shiftIsPressed = false;
            }    
        }
        if(key =="m"){
            if(e.type==="keydown"){
                rotateSelectedTables(30);
            } 
        }
        if(key =="n"){
            if(e.type==="keydown"){
                rotateSelectedTables(-30);
            } 
        }
        if(key =="l"){
            if(e.type==="keydown"){

                //drawFrameForPrinting();
            } 
        }
        if(key =="Delete"){
            if(e.type==="keydown"){
                deleteSelectedTables();
            } 
        }
        if(key ==="Control"){
            //console.log(e);
            if(e.type==="keydown"){
                canvasEl.style.cursor = "move";
                mouseIsMove = true;
            }else if(e.type ==="keyup"){
                canvasEl.style.cursor = "initial";
                mouseIsMove = false;
            }
        }else{
            
        }
        update();
    }
}
function drag(){

}

//UPDATES Canvas on ms time call
function callUpdateOnFPSCall(interval){
    setInterval(() => {
        //console.log("INTERVALFUNCTION");
        //update(previousEvent);
        drawFrame();
    }, interval);
}
//RETURNS THE FPS averaged from 60 calls(around 1 sec)
function fpsCounter(timeDiff){
    let lengthOfTimeDiffs = timeDiffs.push(timeDiff);
    if(lengthOfTimeDiffs>60){
        timeDiffs.shift();
        lengthOfTimeDiffs -= 1;
    }
    //Calculate FPS
    let accumulatedTimeDiffs = 0;
    for(let i = 0; i<lengthOfTimeDiffs; i++){
        accumulatedTimeDiffs += timeDiffs[i];
    }
    let averageTimeDiff = accumulatedTimeDiffs/lengthOfTimeDiffs;
    let fps = 1000/averageTimeDiff;
    return fps.toFixed(0);
}
//SELECT FUNCTION

function select(startX, startY){

}
function selectPoint(pointX, pointY){
    let easyCalcDistance = 50;
    let notSelected = true;
    tableInSelectedGroup = false;
    for(let i=0; i<bord.length; i++){
        let infoAboutTable = bord[i].returnPositionInfo();
        if(infoAboutTable[0] =="rect"){
            //console.log(bord[i].returnId());
            if(ifPointInRectangle(pointX, pointY, infoAboutTable[1])){
                //selected =[bord[i]];
                //console.log(selected);
                if(ifTableInSelected(bord[i])){
                    //console.log("TABLE IS IN SELECTED");
                    tableInSelectedGroup = true;
                }else{
                    addTableToSelected(bord[i], "selected");
                    //console.log(selected);
                    //console.log("SET TABLE SELECTED AS FALSE");
                    tableInSelectedGroup = true;
                    
                }
                notSelected = false;
            }
        }else if(infoAboutTable[0] =="circle"){
            //console.log(bord[i].returnPositionInfo());
            //console.log(bord[i].checkSelf(mouseX, mouseY));
            if(bord[i].checkSelf(mouseX,mouseY) != false){
                if(ifTableInSelected(bord[i])){
                    tableInSelectedGroup = true;
                }else{
                    addTableToSelected(bord[i], "selected");
                    console.log(selected);
                    console.log("SET TABLE SELECTED AS False 2");
                    tableInSelectedGroup = true;
                }
                //selected.push(bord[i]);
                //console.log("Selected");
                
                //console.log(selected);
                notSelected = false;
                
        
            }
        }
    }

    if(notSelected){
        //console.log("CLEAR SELECTED");
        //console.log(selected);
        //console.log(selecting);
        selected =[];
        selecting = [];
    }
}
function ifTableInSelected(table){
    for(tables in selected){
        if(selected[tables].returnId() == table.returnId()){
            //console.log("TRUE");
            return true;
        }
    }
    return false;
}
function selectArea(startX, startY, currentX, currentY){
    let x1, y1, x2, y2;
    if(startX <currentX){
        x1 = startX;
        x2 = currentX;
    }else{
        x1 = currentX;
        x2 = startX;
    }
    if(startY <currentY){
        y1 = startY;
        y2 = currentY;
    }else{
        y1 = currentY;
        y2 = startY;
    }
    //console.log("");
    //console.log("X1: " + x1 + " X2: " + x2);
    //console.log("Y1: " + y1 + " Y2: " + y2);
    let tempSelecting = [];
    for(let i=0; i<bord.length; i++){
        let tableInfo = bord[i].returnPositionInfo();
        if(tableInfo[0] =="rect"){
            let points = tableInfo[1];
            for(let j=0; j<points.length; j++){
                let tableX =points[j][0];
                let tableY = points[j][1];
                if((tableX >= x1 && tableX <= x2) && (tableY >= y1 && tableY <= y2)){
                    //console.log(bord[i].returnId());
                    //console.log(selected.push(bord[i]));
                    //addTableToSelecting(bord[i]);
                    tempSelecting.push(bord[i]);
                    break;
                }
            }
        }else if(tableInfo[0] =="circle"){
            let circleCenterX = tableInfo[1]+(tableInfo[3]/2);
            let circleCenterY = tableInfo[2]+(tableInfo[4]/2);
            if((circleCenterX >= x1 && circleCenterX <= x2) && (circleCenterY >= y1 && circleCenterY <= y2)){
                //console.log(bord[i].returnId());
                //console.log(selected.push(bord[i]));
                //addTableToSelecting(bord[i]);
                tempSelecting.push(bord[i]);
                //break;
            }
        }
    }
    selecting = tempSelecting;
    //console.log(selecting);
}
//UPDATES the input field for table with the name of the table
function setNameForTableInInputField(){
    if(selected[0] != undefined){
        document.getElementById("name-for-table").value = selected[0].descriptor;
    }else{
        document.getElementById("name-for-table").value = selecting[0].descriptor;
    }
    
}
function changeSelectedTableColor(){/*
    if(selected[0] != undefined){
        selected[0].setFillStyle(document.getElementById("color-for-table").value);
        console.log(selected[0].descriptor);
    }else{
        selecting[0].setFillStyle(document.getElementById("color-for-table").value);
    }
*/
    drawSettings.table.notSelectedColor = document.getElementById("color-for-table").value;
    update();
}
function changeSeatColor(){
    drawSettings.seat.occupied = document.getElementById("color-for-seat").value;
    update();
}
function addTableToSelected(table, selectingString){
    if(shiftIsPressed){
        if(selectingString =="selected"){
            selected.push(table);
        }else{
            selecting.push(table);
        }
        
    }else{
        if(selectingString =="selected"){
            selected = [table];
        }else{
            selecting = [table];
        }
        
    }
    setNameForTableInInputField();
}
function addTableToSelecting(table, selectingArray){
    let ifIN = false;
    for(tables in selectingArray){
        if(table.returnId() == selectingArray[tables].returnId()){
            ifIN = true;
            break;
        }
    }
    if(ifIN){

    }else{
        selectingArray.push(table);
        console.log(selectingArray);
    }
    
}

function checkIfInSelecting(bord){
    bord.setFillStyle(drawSettings.table.notSelectedColor);
    for(tables in selecting){
        if(selecting[tables].returnId() == bord.returnId()){
            bord.setFillStyle(drawSettings.table.selectingColor);
        }
    }
    
}
function checkIfInSelected(bord){
    //bord.setFillStyle("#F9FFEE");
    for(tables in selected){
        //console.log(selected);
        if(selected[tables].returnId() == bord.returnId()){
            //SELECT FARGE
            bord.setFillStyle(drawSettings.table.selectedColor);
        }
    }
}

//Draws the select box
function drawSelectBox(startX, startY,){
    ctx.fillStyle = "rgba(33, 150, 243, 0.5)";
    let selectX = mouseX-startX, selectY = mouseY-startY;
    ctx.fillRect(startX, startY, selectX, selectY);
    //ctx.fill();
    //ctx.closePath();
}


function addSelectingToSelected(){
    //console.log(Math.abs(mouseX -clickOriginX));
    //console.log(Math.abs(mouseY -clickOriginY));
    if(Math.abs(mouseX-clickOriginX)>5 && Math.abs(mouseY-clickOriginY)>5){
        if(shiftIsPressed){
            selected += selecting;
        }else{
            selected = selecting;
            //console.log("ADDED");    
        }

    }
}



function setDistanceForSelected(x,y){
    for(tables in selected){
        selected[tables].setDistanceToMouse(x,y);
        //console.log(selected[tables].returnDistanceToMouse());
    }
}






//TRANSLATES BACKGROUND on mouse event move called function, translates per update from "mousemove"
function translateBackground(e){
    translate(mouseX-clickOriginX, mouseY-clickOriginY);
    //console.log("NONE_X: " + mouseX + " : " + clickOriginX);
    clickOriginX = (e.clientX/contextMatrix[0])-contextMatrix[4]/contextMatrix[0];
    clickOriginY = (e.clientY/contextMatrix[3])-contextMatrix[5]/contextMatrix[3];
}



//How the Rectangle points are
//    A
//             B
//  D
//           C
function ifPointInRectangle(pointX, pointY, rectangle){
    let sumTriangleArea =0;
    let pointArray = [pointX, pointY];
    //console.log(rectangle);
    let differentGoThrough = [1,2,3,0];
    for(let i=0; i<rectangle.length; i++){
        let j = differentGoThrough[i];
        let arrayForTriangle = [pointArray, rectangle[i], rectangle[j]];
        let areaAPD = calculateAreaOfTriangle(arrayForTriangle);
        sumTriangleArea += areaAPD;
    }
    let sumRectangle = tableScales.rect.width*tableScales.rect.height;
    let difference = sumRectangle-sumTriangleArea;
    if(difference >= (-1)){
        return true;
    }
    return false
}

//Returns the area of a triangle from array of points" [[x,y],[x,y],[x,y]]
function calculateAreaOfTriangle(trianglePointsArray){
    
    let aPos = trianglePointsArray[0], bPos = trianglePointsArray[1], cPos = trianglePointsArray[2];
    let answer = (aPos[0]*(bPos[1]-cPos[1]) + bPos[0]*(cPos[1]-aPos[1]) + cPos[0]*(aPos[1]-bPos[1]));
    let area = Math.abs(answer/2);
    /* 

         B
    A       
          C


    A, B, P
    A[x,y]
    B[x,y]
    P[x,y]
    Ax*(By - Cy) + Bx * (Cy - Ay) + Cx * (Ay - By)
    
    */
    if(false){
        ctx.strokeWidth = "1";
        ctx.beginPath()
        ctx.moveTo(aPos[0],aPos[1]);
        ctx.lineTo(bPos[0],bPos[1]);
        ctx.lineTo(cPos[0],cPos[1]);
        ctx.lineTo(aPos[0],aPos[1]);
        ctx.closePath();
        ctx.stroke();
    }
    
    return area;
}



//Checks if the mouse hovers a table
function checkIfTable(mouseX, mouseY){
    let loopLength = bord.length;
    let onTable = false;
    for(let i =0; i<loopLength; i++){
        if(bord[i].returnPositionInfo()[0] =="rect"){
            if(ifPointInRectangle(mouseX, mouseY, bord[i].returnPositionInfo()[1])){
                tblPreview = bord[i];
                drawTablePreview();
                return true;
            }
        }else if(bord[i].returnPositionInfo()[0] =="circle"){
            if(bord[i].checkSelf(mouseX, mouseY)){
                return true;
            }

        }
    }
    return false;
}

//Rotates a point around an origin
function rotatePoint(pointX, pointY, originX, originY, angle) {
    angle = angle * Math.PI / 180.0;
    return {
        x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
        y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
    };
}


//Checks if the translation is out of border, if it is it jumps back
function translationLimit(){
    let centerX = (ctx.canvas.width/2-contextMatrix[4])/contextMatrix[0];
    let centerY = (ctx.canvas.height/2-contextMatrix[5])/contextMatrix[0];

    let diffX = 0;
    let diffY = 0;
    if(centerX <0 || centerX > ctx.canvas.width ){
        //X-Difference
        if(centerX < 0 ){
            diffX = 0-centerX;
        }else if(centerX > ctx.canvas.width){
            diffX = ctx.canvas.width - centerX;
        }
        console.log("[TRANSLATION LIMIT] - x ("+diffX + " : " + diffY+")");
    }
    if(centerY <0 || centerY > ctx.canvas.height){
        //Y-Difference
        if(centerY < 0 ){
            diffY = 0-centerY;
        }else if(centerY > ctx.canvas.height){
            diffY = ctx.canvas.height - centerY;
        }
        console.log("[TRANSLATION LIMIT] -  y ("+diffX + " : " + diffY+")");
    }
    translateTo(diffX, diffY);
}

//Translates the VIEW !_BY_! the cordinates provided, not (to).
function translateTo(x,y){
    //console.log("DELAY:" + x + " : " +y);
    x = -x/100;
    y = -y/100;
    xX = x*20;
    yY = y*20;
    for(var i = 0; i<5; i++){
        //setTimeout(console.log("IN FOR-LOOP"),timeDelay*10);
        setTimeout(translate(xX, yY), timeDelay);
        setTimeout(redraw(), timeDelay);
    }
    
    /* translate(x*20, y*20);
    setTimeout(redraw(), timeDelay);
    translate(x*20, y*20);
    setTimeout(redraw(), timeDelay);
    translate(x*20, y*20);
    setTimeout(redraw(), timeDelay);
    translate(x*20, y*20);
    setTimeout(redraw(), timeDelay); */
    //console.log("DELAY:" + x + " : " +y);
}
//SNAP
function snap(currentDragTable, x, y){
    var snapDistance = tableScales.snap;
    let info = bord[currentDragTable].returnTable();
    let currentTableWidth = info[2];
    let currentTableHeight = info[3];
    var loopLength = bord.length;
    var positionCurrent = bord[currentDragTable].returnPosition();

    for(var i =0; i<loopLength; i++){
        if(i != currentDragTable){
            var position = bord[i].returnTable();
            var xDiff = x-position[0];
            var yDiff = y-position[1];
            let iterTableWidth = position[2];
            let iterTableHeight = position[3];
            if(xDiff > 0 && xDiff <= snapDistance+iterTableWidth && yDiff >= (0-snapDistance) && yDiff <= snapDistance){
                // rnd -> current    snap right
                bord[currentDragTable].updatePosition(position[0]+iterTableWidth,position[1]);
                return true;
            }else if(xDiff >= -(snapDistance + currentTableWidth) && xDiff < 0 && yDiff >= (0-snapDistance) && yDiff <= snapDistance){
                // current -> rnd    snap Left
                bord[currentDragTable].updatePosition(position[0]-currentTableWidth,position[1]);
                return true;
            }else if(yDiff >= -(snapDistance + iterTableHeight) && yDiff < 0 && xDiff >= (0-snapDistance) && xDiff <= snapDistance){
                // rnd > current     snap to top 
                bord[currentDragTable].updatePosition(position[0],position[1]-currentTableHeight);
                console.log("SNAP BOT: " + iterTableHeight);
                return true;
                
            }else if(yDiff > 0 && yDiff <= currentTableHeight+snapDistance && xDiff >= (0-snapDistance) && xDiff <= snapDistance){
                // rnd < current     snap bot 
                
                bord[currentDragTable].updatePosition(position[0],position[1]+iterTableHeight);
                console.log("SNAP TOP");
                console.log(position[0]+ " : " + (position[1]+iterTableHeight));
                return true;
            }



        }
    }
    return false;
}

function addTable(bordType){
    //console.log("TEST");
    
    if(bordType =="lang"){
        bord.push(new Bord(200+addTableStacking, 300, "langbord"));
    }else if(bordType =="rund"){
        bord.push(new Bord(200+addTableStacking, 200, "rundbord"));
    }
    addTableStacking+=20;
    update();
    //redraw();
}
function translate(x,y){
    //console.log("translate X:" + x); 
    contextMatrix[4] += contextMatrix[0] * x + contextMatrix[2] * y;
    contextMatrix[5] += contextMatrix[1] * x + contextMatrix[3] * y;
    ctx.translate(x,y);
    //console.log("MATRIX[4]: " + contextMatrix[4]);
}
function scale(x,y, translateX, translateY){
    if(typeof(x) === "number" && typeof(y) === "number"){
        //console.log("[SCALE FUNCTION]");
        //console.log(contextMatrix); //Good
        //console.table();
        //console.trace();
        //console.log(x,y);
        contextMatrix[0] *= x;
        contextMatrix[1] *= x;
        contextMatrix[2] *= y;
        contextMatrix[3] *= y;
        ctx.scale(x,y);
        translate(translateX, translateY);
        //redraw();
        update();
        translationLimit();
    }
    console.log("[SCALE FUNCTION] - FAILED");
}

//SCALE ON MOUSESCROLL
var scaler = function(evt){
    console.log("[SCALER FUNCTION]");
    //Mouse X and Y (Canvas reference)
    //Getting cordinates for mouse position before translation and scaling
    let prevX = (evt.clientX/contextMatrix[0])-contextMatrix[4]/contextMatrix[0];
    let prevY = (evt.clientY/contextMatrix[3])-contextMatrix[5]/contextMatrix[3];
    
    //A: Wheeldata of 160 +/-  = 1.6/0.3
    //B: Wheeldata of   1 +/-  = 1.1/0.9
    //C: wheeldata of  20 +/-  = 1.2/0.8
    var x = evt.wheelDelta/160; //Setting x as 160th of the wheeldelta values from('1' - '1/160')
    //x = x/2;
    //ZOOM bug fix
    if(evt.wheelDelta < 0){
        x=x/2;
    }

    /*
    x = 1/x; // Divides 1 by x I.E: 1/(1/160) = 160, or 1/1
    if(evt.wheelDelta < 0){
        x = 1/(-(x));
    }
    */
    x=x+1;
    //console.log(x);
    let tempX = contextMatrix[0];
    let tempY = contextMatrix[3];
    tempX *=x;
    tempY *=x;
    
    let currentX = (evt.clientX/tempX)-contextMatrix[4]/contextMatrix[0];
    let currentY = (evt.clientY/tempY)-contextMatrix[5]/contextMatrix[3];
    //console.log("PREV_X: " + prevX + " : " + mouseX);
    //console.log("CURR_X: " +currentX + " : " + clickOriginX);
    let translateX = (currentX-prevX);
    let translateY = (currentY-prevY);
    //translateX = prevX-currentX;
    //translateY = prevY- currentY;
    console.log("[WHEELDELTA] : "+ evt.wheelDelta);
    console.log
    //console.log(evt.wheelDelta);

    //Calling zoom functions
    if(contextMatrix[0]<minimumZoom){
        //console.log("Little Zoomed");
        //console.log(contextMatrix[0]);
        if(evt.wheelDelta >0){
            scale(x,x,translateX, translateY);
        }
    }else if(contextMatrix[0]>maximumZoom){
        //console.log("Too Zoomed");
        //1.8
        if(evt.wheelDelta <0){
            scale(x,x,translateX, translateY);
        }
    }else{
        scale(x,x,translateX, translateY);
    }
    //update(evt);
    currentX = (evt.clientX/contextMatrix[0])-contextMatrix[4]/contextMatrix[0];
    currentY = (evt.clientY/contextMatrix[3])-contextMatrix[5]/contextMatrix[3];
    translate(currentX-prevX, currentY-prevY);
    //redraw();
    update(evt);
    return evt.preventDefault() && false;
}

function scaleToScreen(room){
    console.log("[SCALE TO SCREEN]");
    if(room == undefined){
        room = currentRoom;
        console.log("[ROOM UNDEFINED]");
    }
    //Find screen size
    let w = window.innerWidth;
    let h = window.innerHeight;
    let drawingWidth;

    //Find Room size
    /*
    if(room ==="Cafe"){

    }else if(room ==="Manehallen"){
        //drawRoom(manehallen);
        drawingWidth = returnWidthHeightRoom(manehallen);
        //drawRoomPart(manehallenToalett);
        ///drawRoomPart(manehallenBar);
        //drawRoomPart(manehallenFiller);
        //drawRoomPart(manehallenInngang);
    }else if(room ==="Soylehallen"){
        drawingWidth = returnWidthHeightRoom(soylehallen);  
        //drawRoom(soylehallen);
        //drawRoomPart(soylehallenScene);
        //drawRoomPart(soylehallenBar);
        //drawRoomObstacle(soylehallenObstacles);
    }else if(room ==="Hovedhallen"){
        drawingWidth = returnWidthHeightRoom(hovedhallen);
        //drawRoom(hovedhallen);
        //drawRoomPart(hovedhallenScene);
        //drawRoomPart(hovedhallenBar);
        //drawRoomObstacle(hovedhallenObstacles);
        //drawingWidth;  
    }
    */
    //returnWidthHeightCenter();
    //returnWidthHeightRoom();
    //Roomsize = 0.8x Screen size
    drawingWidth = returnWidthHeightRoom(currentRoomPointer);
    //MAxwith maxheight
    let newGuiWidth = document.getElementById("new-GUI").offsetWidth;
    let widthWithMenu = w-newGuiWidth;
    /*
    console.log(widthWithMenu, ":",w, ":", newGuiWidth);
    console.log(drawingWidth[0]);
    */
    let scalingNumber = widthWithMenu/drawingWidth[0];

    console.log("[SCALE TO SCREEN] - ScalingnNumber: "+scalingNumber);
    console.log("[MATRIX] : " + contextMatrix);

    scale(scalingNumber, scalingNumber, 0 ,0);
    console.log("[MATRIX] : " + contextMatrix);

    drawFrame();

}

function drawCenterRectangle(){
    ctx.fillStyle = "red";
    ctx.fillRect(((ctx.canvas.width/2-contextMatrix[4])/contextMatrix[0]), ((ctx.canvas.height/2-contextMatrix[5])/contextMatrix[0]), 20, 20);
    //ctx.fillRect(((ctx.canvas.width/2-contextMatrix[4])/contextMatrix[0]), ((ctx.canvas.height/2-contextMatrix[5])/contextMatrix[0]), 20, 20);
}



function redraw(){
    ctx.clearRect(-window.innerWidth,-window.innerHeight, window.innerWidth*4, window.innerHeight*4);
    ctx.strokeStyle = 'white';

    drawLater = [];
    
    //TEGN SKRAPEMERKER
    let skrapeMerker = document.getElementById("skrapeMerker");
    ctx.drawImage(skrapeMerker, 0 , 0, skrapeMerker.width, skrapeMerker.height);
    //console.log(skrapeMerker);
    //ctx.drawImage(image, dx, dy, dWidth, dHeight);
    // SKRIV KODE HER ETTERPÅ
    for(var i = 0; i<obstacles.length; i++){
        obstacles[i].drawMyself();
    }
    var loopLength = bord.length;
    var counterForStats=0;
    for(var i =0; i<loopLength; i++){
        bord[i].drawMyself();
        counterForStats += bord[i].returnNumberOfSeats();
    }
    
    counterEl.innerHTML = "<h1>0/"+counterForStats+"</h1>";
    
    //ctx.fillStyle = "white";
    //ctx.fillRect(((ctx.canvas.width/2-contextMatrix[4])/contextMatrix[0]), ((ctx.canvas.height/2-contextMatrix[5])/contextMatrix[0]), 20, 20);ctx.fillRect(((ctx.canvas.width/2-contextMatrix[4])/contextMatrix[0]), ((ctx.canvas.height/2-contextMatrix[5])/contextMatrix[0]), 20, 20);
    for(var i = 0; i<drawLater.length; i++){
        console.log("DRAW LATER:" + drawLater);
        bord[drawLater[i]].drawMyself();
    }



}

function drawFrame(){
    //CLEAR FRAME
    ctx.clearRect(-window.innerWidth,-window.innerHeight, window.innerWidth*4, window.innerHeight*4);
    ctx.strokeStyle = 'white';
    //DRAW DUSTMARKS
    let skrapeMerker = document.getElementById("skrapeMerker");
    ctx.drawImage(skrapeMerker, 0 , 0, skrapeMerker.width, skrapeMerker.height);
    
    //DRAW OBSTACLES
    for(var i = 0; i<obstacles.length; i++){
        obstacles[i].drawMyself();
    }
    //console.log("[DRAWFRAME] - after obstacles");

    drawRoomPartObstacle(currentRoom);
    //DRAW SELECTIONBOX
    if(!mouseIsMove && !tableInSelectedGroup && mouseIsPressed){
        drawSelectBox(clickOriginX, clickOriginY, mouseX, mouseY);
    }

    //Setter teksten til å bli skrevet fra midten istedet.
    ctx.textBaseline = "middle";
    //DRAW TABLES
    for(let i =0; i<bord.length; i++){
        bord[i].drawMyself();
    }
    //Resetter tekstposisjonen.
    ctx.textBaseline = "alphabetic";

    ctx.lineWidth = "7";
    ctx.fillStyle = "white";
    //console.log(mouseX);
    ctx.fillRect(mouseX, mouseY, 20, 20);
    ctx.strokeRect(mouseX, mouseY, 24, 24);
    ctx.font = "25px Arial";
    ctx.fillText(((mouseX).toFixed(0) +" : "+ (mouseY).toFixed(0)), mouseX, mouseY);
    ctx.fillStyle = farge;
    ctx.fillStyle = "white";

    //console.log("[DRAWFRAME] - after mouseX");
    
    //drawTablePreview();
    /*
    var d = new Date();
    var n = d.getTime();
    let timeDiff = n-previousTime;
    previousTime = n;
    //counterEl.innerHTML = "<h1>"+ timeDiff + "</h1>";
    counterEl.innerHTML = "<h1>FPS : " + fpsCounter(timeDiff) + "</h1>";
    */
    drawCenterRectangle();

    //console.log("[DRAWFRAME] - End");
}

function pushObstacles(navn){
    if(navn == "Hovedhallen"){
        changeTableScaleBy(1);

        //SCENE
        obstacles.push(new Obstacle(307, 403, "rect", 302, 409, "Scenen"));
        //BAR
        obstacles.push(new Obstacle(2233, 380, "rect", 162, 434, "BAR"));
        obstacles.push(new Obstacle(2029, 683, "rect", 366, 131));
        //TRAPP
        obstacles.push(new Obstacle(1935, 400, "rect", 92, 92,"Trapp"));
        //Søyler
        obstacles.push(new Obstacle(987, 357, "rect", 24, 24));
        obstacles.push(new Obstacle(1378, 357, "rect", 24, 24));
        obstacles.push(new Obstacle(1568, 357, "rect", 24, 24));
        obstacles.push(new Obstacle(2036, 357, "rect", 24, 24));



    }else if(navn == "Soylehallen"){
        changeTableScaleBy(2);
        //BAR/SCENE
        obstacles.push(new Obstacle(1601, 531, "rect", 385 ,815-1,"Scene/BAR"));

        let diam = 22+24;
        let xCords = [534, 887, 1242, 1597];
        let yCords = [430, 685, 945];
        for(var i = 0; i<3; i++){
            for(var j = 0; j<4; j++){
                //obstacles.push(new Obstacle(xCords[j], yCords[i], "circle", 54, 54));
                //obstacles.push(new Obstacle(xCords[j]+diam/2, yCords[i]+diam/2, "circle", diam/2, diam/2));
                obstacles.push(new Obstacle(xCords[j]+diam/4, yCords[i]+diam/4, "rect", diam/2, diam/2));
            }
        }


    }else if(navn == "Cafe"){
        changeTableScaleBy(2);
        //Søyler
        let diam = 18+24;
        let xCord = 406;
        obstacles.push(new Obstacle(xCord+diam/4, 235+diam/4, "rect", diam/2, diam/2));
        obstacles.push(new Obstacle(xCord+diam/4, 499+diam/4, "rect", diam/2, diam/2));
        obstacles.push(new Obstacle(xCord+diam/4, 724+diam/4, "rect", diam/2, diam/2));



    }else if(navn == "Manehallen"){
        changeTableScaleBy(2);
        //Entré
        obstacles.push(new Obstacle(1665, 1037, "rect", 329 ,310-1,"Entré"));

        obstacles.push(new Obstacle(271, 154, "rect", 349, 400, "Toalett"));
        obstacles.push(new Obstacle(613, 154, "rect", 717, 232, "BAR"));
        obstacles.push(new Obstacle(1337, 160, "rect", 658, 287, "WC/Fryserom"));
        //Søyler
        let diam = 54;
        let xCords = [587, 940, 1291, 1640];
        let yCords = [431, 685, 940];
        for(var i = 0; i<3; i++){
            for(var j = 0; j<4; j++){
                //obstacles.push(new Obstacle(xCords[j], yCords[i], "circle", 54, 54));
                //obstacles.push(new Obstacle(xCords[j]+diam/2, yCords[i]+diam/2, "circle", diam/2, diam/2));
                obstacles.push(new Obstacle(xCords[j]+diam/4, yCords[i]+diam/4, "rect", diam/2, diam/2));
            }
        }

    }
    
}




function changeTableScaleBy(multiplier){
    tableScales.rect.width *= multiplier;
    tableScales.rect.height *= multiplier;
    tableScales.circle.width *= multiplier;
    tableScales.circle.height *= multiplier;
}

function checkHitbox(obstacle, table){
    if(table[4] =="rect"){
        //X-Akse
        if((table[0]<(obstacle[0]+obstacle[2])) && ((table[0]+table[2]) >obstacle[0])){
            //Y-Akse
            if((table[1]<(obstacle[1]+obstacle[3])) && ((table[1]+table[3]) >obstacle[1])){
                return true;
            }
        }
    }

    return false;
}
function checkEveryColition(){
    let lengdeObs = obstacles.length;
    let lengdeTbl = bord.length;
    for(var i =0; i<lengdeTbl; i++){
        let tableInOther = false;
        for(var j = 0; j<lengdeObs; j++){
            if(checkHitbox(obstacles[j].returnObstacle(), bord[i].returnTable())){
                let tempArray = [i, j];
                drawLater.push(tempArray);
                tableInOther = true;
            }
        }
        if(tableInOther){
            bord[i].setStrokeColor(red);
        }else{
            bord[i].setStrokeColor(blue);
        }
    }
}


function drawTablePreview(){
    tblctx.clearRect(0,0, 300, 200);
    if(tblPreview !== false && tblPreview !== undefined){
        let collidedObjects = [];
        let tablepos = tblPreview.returnTable();
        //console.log("ID: " + tblPreview.returnId);
        //let seat =[ [this.x, this.y-50, this.width/4, 50, tempType],];
        for(var i = 0; i<drawLater.length; i++){
            //console.log( tblPreview.returnId()+ " : " + bord[drawLater[i][0]].returnId() );
            if(tblPreview.returnId() === bord[drawLater[i][0]].returnId()){
                collidedObjects.push(drawLater[i][1]);
            }
        }
        //console.log(collidedObjects.length);
        //if(checkHitbox(obstacle, seat))
        for(var i = 0; i<4; i++){
            //Ledige Seter
            tblctx.fillStyle = blue;
            tblctx.strokeStyle = darkGrey;
            tblctx.strokeWidth = "1";
            tblctx.fillRect(0+i*75, 0, 75, 50);
            tblctx.fillRect(0+i*75, 150, 75, 50);
            tblctx.strokeRect(0+i*75, 0, 75, 50);
            tblctx.strokeRect(0+i*75, 150, 75, 50);
            tblctx.strokeStyle = "white";
            
            //Dårlige seter
            let width = (tablepos[2]/4);
            let tempForHitbox = [(tablepos[0] + i*width), (tablepos[1]-50), width, 50, tablepos[4]];
            let temp2ForHitbox = [(tablepos[0] + i*width), (tablepos[1]+tablepos[3]), width, 50, tablepos[4]];
            for(var j = 0; j<collidedObjects.length; j++){
                let colided = obstacles[collidedObjects[j]].returnObstacle();
                if(checkHitbox(colided, tempForHitbox)){
                    tblctx.fillStyle = red;
                    tblctx.fillRect(0+i*75, 0, 75, 50);
                    //console.log("TRUE");

                }

                if(checkHitbox(colided, temp2ForHitbox)){
                    tblctx.fillStyle = red;
                    tblctx.fillRect(0+i*75, 150, 75, 50);

                }
            }
        }
        tblctx.fillStyle = blue;
        tblctx.fillRect(0,50, 300, 100);
        tblctx.fillStyle = blue;
    }
    //tblctx.fillStyle = "black";
    //tblctx.fillRect(0, 0, tableCanvas.style.width, tableCanvas.style.height);
    //tblctx.fillRect(0,0, 100, 100);
    
    tblctx.fillStyle ="black";
}

function setRandomTableDescriptors(){
    for(tables in bord){
        let randomLetter = makeid(1);
        bord[tables].setDescriptor(randomLetter);
    }
}
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
 //console.log(makeid(5));

 //Rotates the tables in selected by "degrees" amount
 function rotateSelectedTables(degrees){
    for(tables in selected){
        let table = selected[tables];
        let tableInfo = selected[tables].returnPositionInfo();
        if(tableInfo[0] =="rect"){
            table.rotate(degrees);
        }
    }
}


function exportTableSetup(name=generateID()){
    let obj={};
    obj.name = name;
    obj.room = currentRoom;
    obj.id = generateID();
    obj.tables = exportTables();
    obj.date = getFullDate();
    

    return obj;
}
function exportTables(){
    let tablesList = [];
    for(objects in bord){
        let table =bord[objects];
        tablesList.push(table.returnForExport()); 
    }
    
    return tablesList;
}
function loadTables(list){
    for(tables in list){
        tbl = list[tables];
        bord.push(new Bord(tbl.x, tbl.y, tbl.bordType, tbl.rotation, tbl.descriptor));
        //console.log(idCounter);
    }
}
let tablesListObject = [
    {x:567, y:759, bordType :"langbord", rotation:30, descriptor:"A"},
    {x:876, y:746, bordType :"langbord", rotation:30, descriptor:"B"},
    {x:569, y:1037, bordType :"langbord", rotation:30, descriptor:"C"},
    {x:869, y:1032, bordType :"langbord", rotation:30, descriptor:"D"}
];

//Draws a specific view for printing the webpage without unneccescary things
function drawFrameForPrinting(){
    console.log("[PRINTING] - drawing frame for printing!");
    //Hide New App
    document.getElementById("new-app").style.display = "none";
    
    //Clear screen
    ctx.clearRect(-window.innerWidth,-window.innerHeight, window.innerWidth*4, window.innerHeight*4);
    ctx.strokeStyle = 'white';
    
    //DRAW OBSTACLES
    for(var i = 0; i<obstacles.length; i++){
        obstacles[i].drawMyself();
    }
    
    drawRoomPartObstacle(currentRoom);
    //DRAW SELECTIONBOX
    if(!mouseIsMove && !tableInSelectedGroup && mouseIsPressed){
        drawSelectBox(clickOriginX, clickOriginY, mouseX, mouseY);
    }
    //DRAW TABLES
    for(let i =0; i<bord.length; i++){
        bord[i].drawMyself();
    }
    
    let o = contextMatrix.slice();
    window.print();
    ctx.setTransform(o[0],o[1],o[2],o[3],o[4],o[5]);
    //contextMatrix =[1,0,0,1,0,0];    
    document.getElementById("new-app").style.display = "block";
}


function deleteSelectedTables(){
    for(tables in selected){
        let table = selected[tables];
        deleteTable(table);
    }
}
function deleteTable(table){
    for(tables in bord){
        let bordTable = bord[tables];
        if(bordTable === table){
            bord.splice(tables,1);
            break;
        }
    }
}













function drawPrintingLine(){
    let xValue = window.innerHeight * (297/210);
    let yValue = window.innerHeight * 4;
    ctx.strokeStyle = "red";
    ctx.beginPath()
    ctx.moveTo(xValue,-yValue);
    ctx.lineTo(xValue, yValue);
    ctx.closePath();
    ctx.stroke();
}


//DRAWING EACH ROOM






function initializeRoom(navn){
    if(navn ==="Cafe"){
        currentRoomPointer = manehallen;
        transformX = transformValues.cafe.x;
        transformY = transformValues.cafe.y;
    }else if(navn ==="Manehallen"){
        currentRoomPointer = manehallen;
        transformX = transformValues.manehallen.x;
        transformY = transformValues.manehallen.y;
    }else if(navn ==="Soylehallen"){
        currentRoomPointer = soylehallen;
        transformX = transformValues.soylehallen.x;
        transformY = transformValues.soylehallen.y;
    }else if(navn ==="Hovedhallen"){
        currentRoomPointer = hovedhallen;
        transformX = transformValues.hovedhallen.x;
        transformY = transformValues.hovedhallen.y;
    }
    
}




function setCurrentRoomPointer(room){
    if(room ==="Cafe"){
        currentRoomPointer = manehallen;
    }else if(room ==="Manehallen"){
        currentRoomPointer = manehallen;
    }else if(room ==="Soylehallen"){
        currentRoomPointer = soylehallen;
    }else if(room ==="Hovedhallen"){
        currentRoomPointer = hovedhallen;
    }
}



function translateToCenter(room){
    let roomInfo = returnWidthHeightCenter(room);
    //let canvasCenterX = ((ctx.canvas.width/2- contextMatrix[4])/contextMatrix[0]);
    //let canvasCenterY = ((ctx.canvas.height/2-contextMatrix[5])/contextMatrix[0]);
    
    let centerX = canvasEl.width/2;
    let centerY = canvasEl.height/2;
    console.log("[ROOM INFO] - "+roomInfo);
    //console.log(roomInfo);
    let translateXValue = roomInfo[1][0]-centerX;
    let translateYValue = roomInfo[1][1]+centerY;
    console.log("[TRANSLATING CANVAS] - CenterY and translateY: (" +centerY +  " : " + roomInfo[1][1]+") - ( move Value(-)X" + -translateXValue + " : move ValueY" + translateYValue +")");
    //console.log(-translateXValue + " : " + translateYValue);
    //transformX = -(translateXValue);
    //transformY = (translateYValue);
    //translate(-translateXValue, translateYValue);
}



function onDocumentResize(){
    //ON
    console.log("[ON DOCUMENT RESIZE] - ");
    setCanvasSize();
    translateToCenter(currentRoomPointer); 
}
function setCanvasSize(){
    let o = contextMatrix.slice();
    //ctx.setTransform(contextMatrix);
    //ctx.setTransform(o[0],o[1],o[2],o[3],o[4],o[5]);
    let width = window.innerWidth-document.getElementById("new-GUI").offsetWidth;
    let height = window.innerHeight-document.getElementById("topnav").offsetHeight;
    console.log("[RESIZING CANVAS] - ("+width + " : " + height+")");
    console.log("[MATRIX - UPDATE] - Canvas size change :");
    /*
    console.log(contextMatrix);
    console.log(ctx.getTransform());
    */
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.setTransform(o[0],o[1],o[2],o[3],o[4],o[5]);
/*
    console.log("[MATRIX] -CANVAS SIZE : ");
    console.log(contextMatrix);
    console.log(ctx.getTransform());
*/
    //ctx.canvas.width  = window.innerWidth*0.8;
    //ctx.canvas.height = window.innerHeight*0.8;
    //ctx.canvas.width = width;
    //ctx.canvas.height = height;
    //ctx.canvas.width = document.getElementById("canvas").innerWidth;
    //ctx.canvas.height = document.getElementById("canvas").innerHeight;
    update();
}



function resetCanvasSettings(){
    contextMatrix =[1,0,0,1,0,0];
    selecting = [];
    selected = [];
    bord = [];
}



function getStats(){
    statistics ={
        "bord":{
            "langbord":0,
            "rundbord":0,
        },
        "gjester":{
            "antall":0,
        },
    };

    for(let i =0; i<bord.length; i++){
        let tbl = bord[i];
        statistics.bord[tbl.returnType()] +=1;
        statistics.gjester.antall += tbl.returnNumberOfSeats();
    
    
    }
    //console.log(statistics);
}
function pushStats(stats){
    
    //let statsTextELs = document.querySelectorAll("#GUI-Stats > h3");
    //console.log(statsTextELs);
    let j =0;
    for(statgroups in statistics){
        //console.log(statistics[statgroups]);
        for(substats in statistics[statgroups]){
            //console.log(substats);
            statsTextELs[j].innerHTML = substats+ ": " +statistics[statgroups][substats];
            j++;

        }
    }
}
function pushStatsFast(){
    let j=0;
    for(stats in statistics2){
        statsTextELs[j].innerHTML = stats+ ": " +statistics2[stats];
        j++;
    }
}




function guiUpdate(e){
    e = e || previousEvent;
    update(e);
    getStats();
    pushStats();
}
function setNameForTable(e){
    
    selected[0].setDescriptor(document.getElementById("name-for-table").value);
    update();
}

//ID GENERATION
function generateID(){
    let id1 = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    let id2 = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    let id3 = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    let id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    id = id+id1+id2+id3;
    if(checkID(id)){
        return id;
    }else{
        return generateID();
    }
}
//ID CHECKER
function checkID(id){
    for(let i=0; i<IDList.length;i++){
        if(IDList[i] === id){
            return false;
        }
    }
    IDList.push(id);
    return true;
}

function makeID(){
    return
}


//Opens save Dialog box
function openSaveDialog(){

}

//Sends save to server
function sendSaveToServer(save){
    let saved = document.getElementById("lagredeBord").innerHTML = JSON.stringify(save);
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:5000/save";
    url = "/save";
    xhr.open("POST", url, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
        }
    }
    xhr.send(JSON.stringify(save));
    //xhr.send(save);
    // xhr.send(new Int8Array()); 
    // xhr.send(document);

        console.log(saved);
    

}

//Loads in the requested data for the ID
function getLoadByID(id){
    let sendPackage = {"id":id};
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:5000/loadJsonSave";
    url = "/loadJsonSave";
    xhr.open("POST", url, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            console.log(this.responseText);
        }
    }
    xhr.send(JSON.stringify(sendPackage));
    //xhr.send(id);
    //xhr.send(sendPackage);
}


//Redirects to load the requested preset
function loadNewPageFromPreset(id){
    window.location.href = "/"+id;
}

//Updates the modal popup for save info, and populates it with new data
function updateSaveInfo(save = exportTableSetup()){
    let navn="";
    if(statistics.name !== undefined){
        navn = statistics.name;
    }
    modalContentRightELs[0].innerHTML ="Navn: <b>"+navn+"</b>";
    modalContentRightELs[1].innerHTML ="Antall gjester: <b>"+statistics.gjester.antall+"</b>";
    modalContentRightELs[2].innerHTML ="Rom: <b>"+save.room+"</b>";
    modalContentRightELs[3].innerHTML ="Dato: <b>"+save.date.display+"</b>";

}

//gets the date and returns an object
function getFullDate(){
    let d = new Date();
    let hours = pad(d.getHours(),2);
    let minutes = pad(d.getMinutes(),2);
    let display = hours+":"+minutes+" " +d.getDate()+"."+(d.getMonth()+1)+"."+d.getFullYear();
    let date = {
        "exact":d.getTime(),
        "display":display
    }
    return date;
}

//Adds padding to numbers I.E: 1 -> 01
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}


//Get save dialog updated info
function retrieveSaveDialogData(){
    let data = exportTableSetup();
    data.name = document.getElementById("modalInputName").value;
    data.statistics = statistics;
    return data;
}

function modalSave(){
    let data = retrieveSaveDialogData();
    sendSaveToServer(data);
    modalClose();
}
function modalClose(){
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function saveProjectData(){
    console.log(JSON.stringify(project));
}

//Sets the canvas variables
function setCanvasVariables(){
    if(!canvasVariablesSet){
        console.log("[CANVAS VARIABLES] - Setting variables");
        canvasEl = document.getElementById("canvas");
        //console.log(canvasEl);
        ctx = canvasEl.getContext("2d");
        canvasVariablesLoaded = true;
        //console.log(ctx);
    }else{
        console.log("[CANVAS VARIABLES] - Allready set")
    }
}
//CANVAS SETUP - Sets up the neccescary info for the canvas to work input name
function setupCanvas(navn){
    console.log(previousEvent);
    //contextMatrix = [1,0,0,1,0,0];
    console.log("[CANVAS] - Setting up canvas settings");
    setCanvasVariables();
    //console.log(ctx);
    currentRoom = navn;
    setCurrentRoomPointer(navn);
    initializeRoom(navn);
    //For å unngå bug
    translate(1,1);
    translateToCenter(currentRoomPointer);
    setCanvasSize();
    update();
}
function createCanvasEl(){
    
}
//Sets up css for drawing in canvas
function setupCSSForDrawing(){
    console.log("[CANVAS] - Setting up css for drawing");
    console.log("[MASSIVE BUG] - with css positioning");
    newAppMenuEL.style.display ="none";
    bodyEl.style.overflow =  "hidden"; 
    canvasEl.style.display = "block";
    setTimeout(() => {
        newAppGUIEl.style.display ="";
        scaleToScreen();
    }, 100);
}

//Loads save into drawing by ID
function loadSaveParam(save){
    navn = save.room;
    setupCanvas(navn);
    setupCSSForDrawing();
    loadTables(save.tables);
    guiUpdate();
    update();
}


//Gets the overview json
function retrieveOverview(){
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:5000/getData/overView";
    url = "/getData/overView";
    xhr.open("GET", url, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            overView = JSON.parse(xhr.response);
            console.log("[OVERVIEW REQUEST] - Datatype: "+typeof(overView));
            loadPresets(overView);
        }
    }
    xhr.send();
}

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



function changeWindowSizeFunction(){
    //
    console.log("[CHANGE WINDOW SIZE]");
    setCanvasSize();
}


//Check if typing input is active
function checkIfInType(){
    let elList =[];

    elList.push(document.getElementById("modalInputName"));
    elList.push(document.getElementById("name-for-table"));
    elList.push(document.getElementById("usernameInput"));
    elList.push(document.getElementById("passwordInput"));
    
    for(let i=0; i<elList.length; i++){
        if(document.activeElement === elList[i]){
            return true;
        }
    }
    return false;
}

function projectCreationSetRoom(e, room){
    let roomELs = document.querySelectorAll(".create-project-room");
    //console.log(e);
    document.getElementById("selected-room-for-project").innerHTML = room;

}

function createProjectWithDataButton(e){
    console.log(contextMatrix);
    previousEvent = e;
    setMouseCordinatesWithEvent(e);
    let roomP = document.getElementById("selected-room-for-project").innerHTML;
    let nameP = document.getElementById("create-project-name-input").value;
    let dateP = document.getElementById("create-project-date-input").value;

    project = new Project(roomP, nameP);
    project.setDate(dateP);
    startTegner(roomP);
    //update(event);
    console.log(contextMatrix);
    createTestPersons();
}
function setMouseCordinatesWithEvent(e){
    mouseX = (e.clientX/contextMatrix[0])-contextMatrix[4]/contextMatrix[0];
    mouseY = (e.clientY/contextMatrix[3])-contextMatrix[5]/contextMatrix[3];
}


function makePerson(){
    let iEls = document.querySelectorAll(".personInput");
    let person = new Person(iEls[0].value, iEls[1].value, iEls[2].value, iEls[3].value);
    project.addGuest(person);
    update();
}
function changePerson(){
    let id = document.getElementById("IDPERSON").innerHTML;
    let guests = project.getGuests();
    let personObject;
    for(let j =0; j<guests.length; j++){
        //console.log(guests[j].getId(), " ", id);
        if(guests[j].getId() == id){
            personObject = guests[j];
            //break;
        }
    }
    let iEls = document.querySelectorAll(".personInput");
    personObject.setFirstname(iEls[0].value);
    personObject.setSurname(iEls[1].value);
    personObject.setAge(iEls[2].value);
    personObject.setGender(iEls[3].value);
}

function updateProjectInfoGUI(){
    if(project != undefined){
        let headerElement = document.querySelector("#gui-project-info > div > h1");
        let contentElement= document.querySelectorAll("#gui-project-info > div")[1];
        headerElement.innerHTML = project.getName();

        contentElement.innerHTML ="";
        contentElement.innerHTML += "<h3>📅: " + project.getDateText() + "</h3>";
        let guests = project.getGuests();
        //console.log(guests);
        for(let i = 0; i<guests.length; i++){
            let personDiv = document.createElement("div");
            let personName = document.createElement("h3");
            personName.innerHTML = guests[i].getFullName();
            
            personDiv.onclick=loadPerson;
            personDiv.id = guests[i].getId();
            personDiv.className = "personVisningsDiv";
            personName.id = guests[i].getId();

            personDiv.appendChild(personName);
            contentElement.appendChild(personDiv);
            //console.log(i);
        }
        //console.log(contentElement);
    }
}
function loadPerson(value){
    let id;
    console.log(value);
    if(typeof(value) == "event"){
        id= value.target.id;
    }else if(typeof(value) =="string"){
        id = value;
    }else if(typeof(value) ==="object"){ 
        id= value.target.id;   
    }else if(typeof(value) =="MouseEvent"){
        id= value.target.id;
    }else{
        console.log("[LOAD PERSON] - Value: " + value);
    }
    
    let guests = project.getGuests();
    let personObject;
    for(let j =0; j<guests.length; j++){
        //console.log(guests[j].getId(), " ", id);
        if(guests[j].getId() == id){
            personObject = guests[j];
            //break;
        }
    }
    console.log(personObject);
    let iEls = document.querySelectorAll(".personInput");
    let dataToLoop = personObject.getDataForLoadPerson();
    for(let i = 0; i<dataToLoop.length; i++){
        iEls[i].value = dataToLoop[i];
        console.log(iEls[i]);
        console.log(dataToLoop[i]);
    }
    document.getElementById("IDPERSON").innerHTML = id;
}




function createTestPersons(){
    let personArray = [
        {firstName:"Fabian",surName:"Hopland",age:20,gender:"Mann",allergies:[],id:"05b3e2882e740d88"},
        {firstName:"Thea Wangberg",surName:"Sørum",age:24,gender:"Dame",allergies:[],id:"a3642d36e7c8b097"},
        {firstName:"Margrethe",surName:"Cannistraci",age:51,gender:"Dame",allergies:[],id:"fc1b4a7aca7cd3fc"},
        {firstName:"Eystein",surName:"Hopland",age:55,gender:"Mann",allergies:[],id:"97f01021a3a9a23d"}
    ];
    for(let i =0; i<personArray.length; i++){
        let guest = new Person(personArray[i]);
        project.addGuest(guest);
    }
    update();
}