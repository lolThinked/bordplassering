var contextMatrix = [1,0,0,1,0,0];
let timeDelay = 100;
let svgScales ={
    "Cafe" : {"x": 86, "y": 150},
    "Manehallen" : {"x": 222, "y": 150},
    "Soylehallen" : {"x": 221, "y": 150},
    "Hovedhallen" : {"x": 300, "y": 91}
};
let globalX = 1;
let globalY = 1;
let globalScale =  10;
let darkGrey = "#101010";
let green = "#239641";
let blue = "#237796";
let red = "#a3322a";
let roomPartColor = "rgba(185, 185, 185, 0.3)";
let roomColor = "rgba(34, 43, 56, 0.8)";
roomColor = "white";
let obstacleColor = "#ffffff";
obstacleColor = "black";
let obstacleTextColor = "rgba(185, 185, 185, 0.3)";
let strokeColor =  "#222222";

let transformX = 1342;
let transformY = 208;

let tableScales = {
    "snap" : 10,
    "rect" : {"width" : 200, "height" : 95},
    "circle" : {"width" : 170/2, "height" : 170/2},
};
let transformValues = {
    "hovedhallen" :{x:-458.5 , y:1066},
    "manehallen" : {x:50 ,y:1050+100},
    "soylehallen" : {x:50 ,y:1129+100},
    "cafe" : {x:50,y:1100}
};
let currentRoom;
let currentRoomPointer;

let mouseX;
let mouseY;
let clickOriginX;
let clickOriginY;


let minimumZoom = 0.5, maximumZoom = 5.8;

let mouseIsMove = false;
let shiftIsPressed = false;
let mouseIsPressed = false;

let previousEvent;
previousEvent = {};
previousEvent.clientX =100;
previousEvent.clientY = 100;
let previousTime = 0;
let timeDiffs=[];


let tableInSelectedGroup = false;
let selecting = [];
let selected = [];

//STATISTICS
let statsTextELs = document.getElementsByClassName("counter-text");
let statistics ={
    "bord":{
        "langbord":0,
        "rundbord":0,
    },
    "gjester":{
        "antall":0,
    },

};
let statistics2 ={
    "langbord":100,
    "rundbord":100,
    "antall":1100,
};
let addTableStacking =0;

