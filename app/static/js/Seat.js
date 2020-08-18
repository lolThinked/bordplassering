class SeatController{
    constructor(parentTable){
        this.table = parentTable;
        let tempValue = parentTable.returnCenter();
        this.numberOfSeats = parentTable.returnNumberOfSeats();
        this.x = tempValue[0];
        this.y = tempValue[1];
        this.seats = [];
        this.radius = parentTable.returnWidth() + 20;
        this.distanceBewteenPointsOncircle = 0;
        //console.log(this.numberOfSeats);
        if(parentTable.returnType() =="rundbord"){
            let distanceBewteenPointsOncircle = (Math.PI*2)/this.numberOfSeats;
            this.distanceBewteenPointsOncircle = distanceBewteenPointsOncircle;
            for(let i =0; i<this.numberOfSeats; i++){
                let xV = Math.cos(distanceBewteenPointsOncircle*i)*this.radius;
                let yV = Math.sin(distanceBewteenPointsOncircle*i)*this.radius;
                this.seats[i] = new Seat(xV, yV, this, i);
            }
        }else if(parentTable.returnType() =="langbord"){
            /*
            let distanceBewteenPointsOncircle = (Math.PI*2)/this.numberOfSeats;
            for(let i =0; i<this.numberOfSeats; i++){
                let xV = Math.cos(distanceBewteenPointsOncircle*i)*this.radius;
                let yV = Math.sin(distanceBewteenPointsOncircle*i)*this.radius;
                this.seats[i] = new Seat(xV, yV, this, i);
            }
            */
            this.radius = parentTable.returnWidth()/2 + 20;
            let info = parentTable.returnPositionInfo();
            let points = info[1];
            let centerLine = {"start":[],"end":[], "center":[],"vector":[], "angle":0, "length":0};
            centerLine.start[0] = (points[0][0]+points[3][0])/2;
            centerLine.start[1] = (points[0][1]+points[3][1])/2;
            centerLine.end[0] = (points[1][0]+points[2][0])/2;
            centerLine.end[1] = (points[1][1]+points[2][1])/2;
            centerLine.center[0] = (centerLine.start[0]+centerLine.end[0])/2;
            centerLine.center[1] = (centerLine.start[1]+centerLine.end[1])/2;
            centerLine.vector[0] = centerLine.start[0]-centerLine.end[0];
            centerLine.vector[1] = centerLine.start[1]-centerLine.end[1];
            centerLine.angle = 2*Math.PI-Math.atan2(centerLine.vector[0], centerLine.vector[1]);
            centerLine.length = Math.sqrt(centerLine.vector[0]**2 + centerLine.vector[1]**2);
        
            let limiter =2;
            let numberPerSide = (this.numberOfSeats-2)/2;
            let sideCounter =numberPerSide;
            if(this.numberOfSeats % 2 != 0){
                limiter=1;
                let seatPointX = this.radius*Math.sin(centerLine.angle) + centerLine.start[0];
                let seatPointY = this.radius*Math.cos(centerLine.angle)+ centerLine.start[1];
                let xV = seatPointX - this.x;
                let yV = seatPointY - this.y;
                this.seats[this.numberOfSeats-1] = new Seat(xV, yV, this, this.numberOfSeats-1);
                numberPerSide = (this.numberOfSeats-1)/2;
                sideCounter =numberPerSide;
            }else{
                let seatPointX = drawSettings.seatController.radius*Math.sin(centerLine.angle)+ centerLine.end[0];
                let seatPointY = drawSettings.seatController.radius*Math.cos(centerLine.angle)+ centerLine.end[1];
                let xV = seatPointX - this.x;
                let yV = seatPointY - this.y;
                this.seats[this.numberOfSeats-1] = new Seat(xV, yV, this, this.numberOfSeats-1);
                //Seat2
                seatPointX = (-1)*drawSettings.seatController.radius*Math.sin(centerLine.angle)+ centerLine.start[0];
                seatPointY = (-1)*drawSettings.seatController.radius*Math.cos(centerLine.angle)+ centerLine.start[1];
                xV = seatPointX - this.x;
                yV = seatPointY - this.y;
                this.seats[this.numberOfSeats-2] = new Seat(xV, yV, this, this.numberOfSeats-2);
            }
            let distanceBetweenPointsOnLine = centerLine.length/numberPerSide;
            this.distanceBewteenPointsOncircle = distanceBetweenPointsOnLine/2;
            //Adding other seats
            for(let i=0;i<(this.numberOfSeats-limiter)/2; i++){
                let startingX = centerLine.start[0] + i*distanceBetweenPointsOnLine*Math.sin(centerLine.angle) + distanceBetweenPointsOnLine/2*Math.sin(centerLine.angle);
                let startingY = centerLine.start[1] + i*distanceBetweenPointsOnLine*Math.cos(centerLine.angle) + distanceBetweenPointsOnLine/2*Math.cos(centerLine.angle);
                let seatPointY;
                let seatPointX;
                let xV;
                let yV;
                
                seatPointX = (drawSettings.seatController.radius+tableScales.rect.height/2)*Math.cos(centerLine.angle) + startingX;
                seatPointY = (drawSettings.seatController.radius+tableScales.rect.height/2)*Math.sin(centerLine.angle) + startingY;
                xV = seatPointX - this.x;
                yV = seatPointY - this.y;
                this.seats[i+numberPerSide] = new Seat(xV, yV, this, i+numberPerSide);
                seatPointX = (-1)*(drawSettings.seatController.radius+tableScales.rect.height/2)*Math.cos(centerLine.angle) + startingX;
                seatPointY = (-1)*(drawSettings.seatController.radius +tableScales.rect.height/2)*Math.sin(centerLine.angle) + startingY;
                xV = seatPointX - this.x;
                yV = seatPointY - this.y;  
                this.seats[i] = new Seat(xV, yV, this, i);
            }
        }
    }
    addGuestWithSeatNumber(person, seatNumber){
        //console.log(seatNumber);
        this.seats[seatNumber].addPerson(person);
    }
    returnDistanceBetweenTables(){
        return this.distanceBewteenPointsOncircle;
    }
    updatePosition(){
        let tempValue = this.table.returnCenter();
        this.x = tempValue[0];
        this.y = tempValue[1];
        for(let i = 0; i<this.numberOfSeats; i++){
            this.seats[i].updatePosition();
        }
    }
/*
    returnPosition(){
        return [this.x, this.y];
    }
*/  

    addGuests(personObjectList){
        return
    }
    drawSeats(){
        for(let i = 0; i<this.numberOfSeats; i++){
            this.seats[i].drawMyself();
        }
        
    }
    rotateSeats(x,y, angle){
        for(let i=0; i<this.seats.length; i++){
            this.seats[i].rotate(x,y,angle);
        }
    }

    getTable(){
        return this.table;
    }
    addPersonIfToSeatIfCordinatesElseController(mseX,mseY,person){
        console.log("[ADD TO SEATS FUNCTION] - ");
        //25+20+witdh
        console.log(drawSettings.seat.width, drawSettings.seatController.radius, tableScales.circle.width, drawSettings.seatController.extraHitbox);
        let distanceCheck = drawSettings.seat.width+drawSettings.seatController.radius + tableScales.circle.width + drawSettings.seatController.extraHitbox;
        let difx = mseX-this.x;
        let dify = mseY-this.y;
        let distanceToMouse = Math.sqrt(difx*difx + dify*dify);
        console.log(distanceToMouse, distanceCheck);
        if(distanceToMouse <= tableScales.circle.width/4){
            return
        }
        console.log(distanceToMouse, distanceCheck);
        if(distanceToMouse <= distanceCheck){
            console.log("[DISTANCE CHECK SUCCEDED]");
            let seatI;
            for(seatI in this.seats){
                let checkSeatValue = this.seats[seatI].checkIfCordinatesIsLessThanRadiusAway(mseX,mseY);
                if(checkSeatValue){
                    this.seats[seatI].addPerson(person);
                    console.log(person.getFirstName()+" Added to table: " + seatI);
                    return true;
                }
            }
            console.log(person.getFirstName() + " -  Not added to table");
            return false
            
        }
    }
}

//SEAT CLASS
class Seat{
    constructor(xVector, yVector, seatController, id, person){
        this.xVector = xVector;//From parentTable
        this.yVector = yVector;
        this.seatController = seatController;
        this.person = person || false;
        this.drawObject = undefined;
        /*
        this.x = seatController.returnPosition()[0] + xVector;
        this.y = seatController.returnPosition()[1] + yVector;
        */
        this.x = seatController.x + xVector;
        this.y = seatController.y + yVector;
        this.id = id;

        //console.log(this.xVector, this.y);
    }
    getPosition(){
        return [this.x, this.y];
    }
    getId(){
        return this.id;
    }
    addPerson(person){
        this.person = person;
        //Adds Current references to Person Object
        this.person.setSeat(this);
        this.person.setTable(this.seatController.getTable()); 
    }
    removePerson(){
        this.person.setSeat(undefined);
        this.person = false;
        console.log(this.person);
    }
    addDrawingObjectReference(drawingObject){
        this.drawObject = drawingObject;
    }
    removeDrawObject(){
        this.drawObject = undefined;
    }
    updatePosition(){
        this.x = this.seatController.x + this.xVector;
        this.y = this.seatController.y + this.yVector;
        if(this.drawObject != undefined){
            this.drawObject.updatePositionNEW(this.x, this.y);
        }
    }
    rotate(x,y,angle){
        let xPoint = this.x + this.xVector;
        let yPoint = this.y + this.yVector;
        let rotatedCords = rotatePoint(this.x, this.y, x, y, angle);
        this.x = rotatedCords.x;
        this.y = rotatedCords.y;
        let tblPos = this.seatController.getTable().returnCenter()
        this.xVector = this.x - tblPos[0];
        this.yVector = this.y - tblPos[1];
    }

    checkIfCordinatesIsLessThanRadiusAway(mseX, mseY){
        let distanceCheck = drawSettings.seat.width;
        //distanceCheck = this.seatController.returnDistanceBetweenTables()+tableScales.circle.width;
        distanceCheck = this.seatController.returnDistanceBetweenTables()/2 + drawSettings.seat.width;
        let difx = mseX-this.x;
        let dify = mseY-this.y;
        console.log(difx,mseX,this.x, dify);
        let distanceToMouse = Math.sqrt(difx*difx + dify*dify);
        console.log("[SEAT "+this.id+"] "+ distanceToMouse + " : " + distanceCheck);
        if(distanceToMouse <= distanceCheck){
            return true
        }else{
            return false
        }
    }
    //50cm?
    async drawMyself(){

        if(!this.person){
            //console.log(this);git add
            ctx.fillStyle = drawSettings.seat.occupied;ctx.strokeStyle = drawSettings.standard.strokeColor;
            ctx.lineWidth = drawSettings.seat.lineWidth;
            ctx.beginPath();
            ctx.arc(this.x, this.y, drawSettings.seat.width, 0, 2*Math.PI, false);
            //console.log(this.x, this.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            //console.log("DRAWING SEATS");
            if(!this.person){
                ctx.fillStyle = "black";
                ctx.fillText(this.id, this.x, this.y);
            }
            ctx.fillStyle = drawSettings.standard.fillColor;  
            ctx.lineWidth = drawSettings.standard.lineWidth;
        }else{
            //ctx.fillStyle = drawSettings.seat.free;
            //ctx.fillStyle = drawSettings.standard.fillColor;
            this.person.drawMyself(this.x-drawSettings.seat.width/2, this.y-drawSettings.seat.height/2);
        }
        
    }
}