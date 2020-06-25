let manehallen = [
    {x: 55, y: 0},
    {x: 55,y: 216 },
    {x: 19,y: 216},
    {x: 19,y: 376},
    {x: 55,y: 376},
    {x: 55,y: 635},
    {x: 0,y: 635},
    {x: 0,y: 767},
    {x: 55,y: 767},
    {x: 55,y: 776},
    {x: 377,y:776 },
    {x: 377,y:855 },
    {x: 595,y:855 },
    {x: 595,y:982 },
    {x: 673,y: 982},
    {x: 691,y:985 },
    {x: 691,y:895 },
    {x: 1069,y:895 },
    {x: 1139,y:795 },
    {x: 1543,y:795 },
    {x: 1543,y:845 },
    {x: 1653,y:845 },
    {x: 1653,y:282 },
    {x: 1406,y:282 },
    {x: 1406,y:0 },
    {x: 751,y:0 },
    {x: 751,y:12 },
    {x: 700,y:12 },
    {x: 700,y:0 },

];
let manehallenToalett= [
    {x:1069 , y:1100},
    {x:1653 , y:1100 },
    {x:1653 , y:845 },
    {x: 1543, y:845 },
    {x:1543 , y:795},
    {x:1139 , y:795},
    {x: 1069, y:895}
];
let manehallenBar = [
    {x: 377,y:855 },
    {x: 595,y:855 },
    {x: 595,y:982 },
    {x: 673,y: 982},
    {x: 691,y:985 },
    {x: 691,y:895 },
    {x: 1069,y:895 },
    {x:1069, y:1100},
    {x:377, y:1100}
];
let manehallenFiller =[
    {x:377, y:1100},
    {x:0, y:1100},
    {x: 0,y: 767},
    {x: 55,y: 767},
    {x: 55,y: 776},
    {x: 377,y:776 }
];
let manehallenInngang = [
    {x: 1653,y:282 },
    {x: 1406,y:282 },
    {x: 1406,y:0 },
    {x: 1653, y:0}
];



let hovedhallen =[
    {x:755, y:955 },
    {x: 2972, y:955 },
    {x: 2972, y:650 },
    {x: 2719, y:650 },
    {x: 2564, y:466 },
    {x: 2564, y:0 },
    {x: 505, y:0 },
    {x: 505, y:610 },
    {x: 755, y:610 }
];
let hovedhallenScene =[
    {x: 0, y:610},
    {x: 505, y:610 },
    {x: 505, y:0 },
    {x: 0, y:0 }
];
let hovedhallenBar =[
    {x: 2719, y:650 },
    {x: 3128, y:650 },
    {x: 3128, y:0 },
    {x: 2564, y:0 },
    {x: 2564, y:466 }
];
//Y: +20 pga bredden til søylene
let hovedhallenObstacles = [
    {x:877 ,y: 596, type: "R",width: 20,height: 20},
    {x:1395 ,y: 596, type: "R",width: 20,height: 20},
    {x:1635 ,y: 596, type: "R",width: 20,height: 20},
    {x:2225 ,y: 596, type: "R",width: 20,height: 20},
    {x:2144 ,y: 455, type: "C",width: 100,height: 100},
    {x:2144 ,y: 455, type: "R",width: 100,height: 100},
    {x:2144 ,y: 455, type: "T",text: "Trapp"},
    
];


let soylehallen = [
    {x:0 ,y:0 },
    {x:0 ,y:1129 },
    {x:1733 ,y:1129 },
    {x:1733 ,y:749 },
    {x:1526 ,y:749 },
    {x: 1526,y: 0}
];
let soylehallenScene = [
    {x: 1311,y:611 },
    {x: 1311,y:355 },
    {x: 1526,y:355 },
    {x: 1526,y:611 }
];
let soylehallenBar = [
    {x: 1361,y:355 },
    {x: 1526,y:355 },
    {x: 1526,y:0 },
    {x: 1361,y:0 }
];
let soylehallenObstacles = [];
function createSoylehallenObstacles(){
    let startX = 46, startY = 355;
    let counter = 0;
    for(let i=0; i<3; i++){
        startX = 46;
        for(let j=0; j<5; j++){
            let pillarObject= {x:0, y:0, type:"C", width:20, height:20};
            pillarObject.x =startX;
            pillarObject.y =startY;
            soylehallenObstacles[counter] = pillarObject;
            counter++;
            startX +=338
        }
        startY+=257;
    }
}
createSoylehallenObstacles();
//console.log(soylehallenObstacles);


function scaleRoomPoints(room){
    let scalingFactor = 1.08;
    for(let i=0; i<room.length; i++){
        let pt = room[i]; 
        pt.x *= scalingFactor;
        pt.y *= scalingFactor;
    }
}
//scaleRoomPoints(manehallen);
//scaleRoomPoints(manehallenToalett);
//console.log("Width + Height "+returnWidthHeightRoom(manehallen));
//1653, 985

//transformY = 1342;
//transformX = 208;
function returnWidthHeightRoom(room){
    let maxWidth =0;
    let maxHeight =0;
    for(points in room){
        let point = room[points];
        if((point.x-maxWidth)>0){
            maxWidth = point.x;
        }
        if((point.y -maxHeight)>0){
            maxHeight = point.y;
        }
    }
    return [maxWidth, maxHeight];
}

function returnWidthHeightCenter(room){
    let maxWidth =room[0].x;
    let maxHeight =room[0].y;
    let minX = room[0].x, minY = room[0].y;
    let roomCenterX, roomCenterY;
    for(points in room){
        let point = room[points];
        if(point.x>maxWidth){
            maxWidth = point.x;
        }
        if(point.y>maxHeight){
            maxHeight = point.y;
        }
        if(point.x <minX){
            minX = point.x;
        }
        if(point.y <minY){
            minY = point.y;
        }
    }
    roomCenterX = (maxWidth+minX)/2;
    roomCenterY = (maxHeight+minY)/2;

    //console.log(maxWidth + " : maxWidth-min : " + minX);
    //console.log(maxHeight + " maxHeight-min : " + minY);
    //console.log(roomCenterX + " : roomcenterX - centerY : "  + roomCenterY);
    return [[maxWidth, maxHeight], [roomCenterX, roomCenterY]];
}



transformX = 0;
transformY = 0;
function drawRoom(room){
    //let widthHeight = returnWidthHeightRoom(room);
    //let transformX = (widthHeight[0]/2);
    //let transformY = (widthHeight[1]);
    //transformY = 1342;
    //transformX = 208;
    ctx.fillStyle = roomColor;
    ctx.strokeStyle= strokeColor;

    ctx.beginPath();
    ctx.moveTo(room[0].x + transformX, -(room[0].y) + transformY);
    for(let i =0; i<(room.length-1); i++){
        let pt = room[i+1];
        ctx.lineTo(pt.x +transformX, -(pt.y) + transformY );
    }
    ctx.lineTo(room[0].x + transformX, -(room[0].y) + transformY);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
function drawRoomPart(room){
    //let widthHeight = returnWidthHeightRoom(room);
    //let transformX = (widthHeight[0]/2);
    //let transformY = (widthHeight[1]);
    //transformY = 1342;
    //transformX = 208;
    ctx.fillStyle = roomPartColor;
    ctx.strokeStyle= strokeColor;
    ctx.beginPath();
    ctx.moveTo(room[0].x + transformX, -(room[0].y) + transformY);
    for(let i =0; i<(room.length-1); i++){
        let pt = room[i+1];
        ctx.lineTo(pt.x +transformX, -(pt.y) + transformY );
    }
    ctx.lineTo(room[0].x + transformX, -(room[0].y) + transformY);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
function drawRoomObstacle(obstacleList){
    //let transformY = 1342;
    //let transformX = 208;
    ctx.fillStyle = obstacleColor;
    ctx.strokeStyle = strokeColor;
    //ctx.fillRect(0,0,100,100);
    //ctx.fillRect(2144+transformX,-455 + transformY,100,100);
    for(let i = 0; i < obstacleList.length; i++){
        let obs = obstacleList[i];
        //console.log(obs.y);
        if(obstacleList[i].type ==="R"){
            ctx.fillRect(obs.x+transformX, -(obs.y)+transformY, obs.width, obs.height);
            ctx.strokeRect(obs.x+transformX, -(obs.y)+transformY, obs.width, obs.height);
            
            //ctx.fill();
        }else if(obstacleList[i].type ==="C"){
            ctx.beginPath();
            ctx.arc(obs.x+transformX, -obs.y+transformY, obs.width, 2*Math.PI, false);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }else if(obs.type ==="T"){
            ctx.fillStyle = obstacleTextColor;
            ctx.fillText(obs.text, obs.x+transformX - (obs.text.length * 10), -obs.y+transformY);
        }
    }
    ctx.fillStyle ="white";
}




function drawRoomPartObstacle(room){
    if(room ==="Cafe"){

    }else if(room ==="Manehallen"){
        drawRoom(manehallen);
        drawRoomPart(manehallenToalett);
        drawRoomPart(manehallenBar);
        drawRoomPart(manehallenFiller);
        drawRoomPart(manehallenInngang);
    }else if(room ==="Soylehallen"){
        drawRoom(soylehallen);
        drawRoomPart(soylehallenScene);
        drawRoomPart(soylehallenBar);
        drawRoomObstacle(soylehallenObstacles);
    }else if(room ==="Hovedhallen"){
        drawRoom(hovedhallen);
        drawRoomPart(hovedhallenScene);
        drawRoomPart(hovedhallenBar);
        drawRoomObstacle(hovedhallenObstacles);
    }
}