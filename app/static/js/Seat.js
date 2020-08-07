class SeatController{
    constructor(parentTable){
        this.table = parentTable;
        let tempValue = parentTable.returnCenter();
        this.numberOfSeats = parentTable.returnNumberOfSeats();
        this.x = tempValue[0];
        this.y = tempValue[1];
        this.seats = [];
        this.radius = parentTable.returnWidth() + 20;
        this.distanceBewteenPointsOncircle;
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
            let distanceBewteenPointsOncircle = (Math.PI*2)/this.numberOfSeats;
            for(let i =0; i<this.numberOfSeats; i++){
                let xV = Math.cos(distanceBewteenPointsOncircle*i)*this.radius;
                let yV = Math.sin(distanceBewteenPointsOncircle*i)*this.radius;
                this.seats[i] = new Seat(xV, yV, this, i);
            }
        }
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
        if(distanceToMouse <= tableScales.width/4){
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
    }
    addDrawingObjectReference(drawingObject){
        this.drawObject = drawingObject;
    }
    updatePosition(){
        this.x = this.seatController.x + this.xVector;
        this.y = this.seatController.y + this.yVector;
        if(this.drawObject != undefined){
            this.drawObject.updatePositionNEW(this.x, this.y);
        }
    }

    checkIfCordinatesIsLessThanRadiusAway(mseX, mseY){
        let distanceCheck = drawSettings.seat.width;
        distanceCheck = this.seatController.returnDistanceBetweenTables()*tableScales.circle.width;
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
    drawMyself(){

        if(!this.person){
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