let idCounter = 1;
class Bord{
    constructor(positionX, positionY, bordType, rotation, descriptor, name,id){
        this.x = positionX || 400;
        this.y = positionY || 300;
        this.bordType = bordType || "langbord";
        this.id = idCounter;
        idCounter++;
        this.id = id || generateID();
        this.name = name || "gi navn";
        this.width = 0;
        this.height = 0;
        this.total = 0;
        this.strokeColor = blue;
        this.fillColor = "white";
        this.lineWidth = "5";
        this.rotation = 0;
        this.distanceToMouseX;
        this.distanceToMouseY;
        this.descriptor = descriptor || "";
        this.descriptorX, this.descriptorY;
        this.persons = [];
        this.unseatedPersons =[];
        this.seats = [];
        
        if(bordType == "langbord"){
            this.width = tableScales.rect.width;
            this.height = tableScales.rect.height;
            this.total = 8;
            this.drawPoints = [
                [this.x, this.y],
                [this.x + this.width, this.y],
                [this.x + this.width, this.y+this.height],
                [this.x, this.y+this.height]
            ];
            this.descriptorX = (this.x + this.width/2);
            this.descriptorY = this.y + this.height/2;
            
            //this.vectorDiagonal = Math.sqrt(Math.pow(this.width, 2)+Math.pow(this.height, 2));
            //console.log(this.vectorDiagonal);
        }else if(bordType =="rundbord"){
            this.height = this.width= tableScales.circle.width;
            this.total = 6;
            this.descriptorX = (this.x + this.width/2);
            this.descriptorY = this.y + this.height/2;
        }
        
        this.seats = new SeatController(this);
        this.rotate(rotation);
    }
    addGuest(guest, isPersonSeated){
        //isPersonSeated = isPersonSeated || false;
        if(!isPersonSeated){
            this.unseatedPersons.push(guest);
        }
        this.persons.push(guest);
    }
    changeTotalSeats(number){
        this.total = number;
        this.seats = new SeatController(this);
    }
    getId(){
        return this.id;
    }
    getSeatsObject(){
        return this.seats;
    }
    rotate(angle){
        //console.log(this.drawPoints);
        if(angle ==0 || angle ==undefined){
            return
        }
        if(this.bordType =="langbord"){
            for(let i = 1; i<this.drawPoints.length; i++){
            
                let rotatedCords = rotatePoint(this.drawPoints[i][0], this.drawPoints[i][1], this.x, this.y, angle);
                
                this.drawPoints[i][0] = rotatedCords.x;
                this.drawPoints[i][1] = rotatedCords.y;
                //console.log(rotatedCords);
            }
            if(this.bordType =="langbord"){
                //console.log("teste");
                let rotatedCords = rotatePoint(this.descriptorX, this.descriptorY, this.x, this.y, angle);
                this.descriptorX = rotatedCords.x;
                this.descriptorY = rotatedCords.y;
            }
            if(this.seats != undefined){
                this.seats.rotateSeats(this.x, this.y, angle);
            }
            this.rotation += angle;
            //console.log(this.drawPoints[1][0]);
        }else{
            return
        }
    }
    returnTable(){
        let tempType;
        if(this.bordType == "langbord"){
            tempType =  "rect";
        }else if(this.bordType == "rundbord"){
            tempType = "circle";
        }
        let tempArray = [this.x, this.y, this.width, this.height, tempType];
        return tempArray;
    }
    returnPositionInfo(){
        let tempArray = [];
        let tempType;
        if(this.bordType == "langbord"){
            tempType = "rect";
            tempArray = [tempType, this.drawPoints, this.angle];
        }else if(this.bordType == "rundbord"){
            tempType = "circle";
            tempArray = [tempType, this.x, this.y, this.width, this.height];
        }
        return tempArray;
    }

    returnWidth(){
        return this.width;
    }
    returnNumberOfSeats(){
        return this.total;
    }
    setNumberOfSeats(number){
        this.total = number;
    }
    returnType(){
        return this.bordType;
    }
    returnPosition(){
        return [this.x, this.y];
    }
    returnCenter(){
        let centerX;
        let centerY;
        if(this.bordType == "langbord"){
            centerX = this.descriptorX;
            centerY = this.descriptorY;
        }else if(this.bordType == "rundbord"){
            centerX = this.x;
            centerY = this.y;
        }
        return [centerX, centerY];
    }


    returnDistanceToMouse(){
        return [this.distanceToMouseX, this.distanceToMouseY];
    }
    setName(name){
        this.name = name;
    }
    returnForExport(){
        let exportObj ={
            
        }
        exportObj.x = this.x;
        exportObj.y = this.y;
        exportObj.bordType = this.bordType;
        exportObj.rotation = this.rotation;
        exportObj.descriptor = this.descriptor;
        exportObj.name = this.name;
        exportObj.id = this.id;
        return exportObj;
    }
    updatePosition(x,y){
        let diffX = this.x-x;
        let diffY = this.y-y;
        this.x = x;
        this.y = y;
        if(this.bordType =="langbord"){
            //console.log(this.bordType);
            for(let i = 0; i<this.drawPoints.length; i++){
                this.drawPoints[i][0] -= diffX;
                this.drawPoints[i][1] -= diffY;
            }
        }
    }
    //UPDATES POSITION TO MOUSE POSITION with Diff from mouse
    updatePositionNEW(x,y){
        x -= this.distanceToMouseX;
        y -= this.distanceToMouseY;
        let diffX = this.x-x;
        let diffY = this.y-y;
        //this.x = x-this.distanceToMouseX;
        //this.y = y-this.distanceToMouseY;
        this.x = x;
        this.y = y;
        if(this.bordType =="langbord"){
            //console.log(this.bordType);
            for(let i = 0; i<this.drawPoints.length; i++){
                this.drawPoints[i][0] -= diffX;
                this.drawPoints[i][1] -= diffY;
            }
        }
        this.descriptorX -= diffX;
        this.descriptorY -= diffY;
        this.seats.updatePosition();
        let t;
        for(t in this.unseatedPersons){
            let prs = this.unseatedPersons[t];
            //prs.get
            let tbls;
            for(tbls in bord){
                if(bord[tbls].returnPositionInfo()[0] === "person"){
                    if(bord[tbls].getId() === prs.getId()){
                        //bord[tbls].updatePositionNEW(x,y);
                        if(this.bordType =="langbord"){
                            bord[tbls].updatePositionNEW(this.descriptorX,this.descriptorY);
                        }else{
                            bord[tbls].updatePositionNEW(x,y);
                        }
                        
                    }
                }
            }
        }
    }
    //SETS DISTANCE TO MOUSE
    setDistanceToMouse(x,y){
        this.distanceToMouseX = x-this.x;
        this.distanceToMouseY = y-this.y;
    }

    //Updates position by(x,y)
    updatePositionBy(x,y){
        let diffX = this.x-x;
        let diffY = this.y-y;
        this.x += x;
        this.y += y;
        if(this.bordType =="langbord"){
            //console.log(this.bordType);
            for(let i = 0; i<this.drawPoints.length; i++){
                this.drawPoints[i][0] -= diffX;
                this.drawPoints[i][1] -= diffY;
            }
        }
    }

    setDescriptor(str){
        this.descriptor = str;
    }

    setStrokeColor(color){
        this.strokeColor = color;
        
    }
    setFillStyle(color){
        this.fillColor = color;
    }
    checkSelf(x,y){
        if(this.bordType !="rundbord"){
            if(x >= this.x && x <= (this.x+this.width)){
                if(y >= this.y && y <= (this.y+this.height)){
                    var difference = [this.x-x, this.y-y];
                    return difference;
                }
            }
        }else{
            /*
            if(x >= (this.x-this.height) && x <= (this.x+this.width)){
                if(y >= (this.y-this.height) && y <= (this.y+this.height)){
                    var difference = [this.x-x, this.y-y];
                    return difference;
                }
            }
            */
            //Check if distance to table is less than big hitbox
            //if()
            
            let distanceCheck = drawSettings.seat.width+drawSettings.seatController.radius + tableScales.circle.width + drawSettings.seatController.extraHitbox;
            let difx = x-this.x;
            let dify = y-this.y;
            let distanceToMouse = Math.sqrt(difx*difx + dify*dify);
            if(distanceToMouse <= tableScales.circle.width){
                return distanceToMouse;
            }
            
        }
        
        return false;
    }
    checkSelfWidthSeatRange(x,y){
        if(this.bordType =="langbord"){
            //Change drawPoints to extend hitbox
            let extendedHitboxDrawpoints = [[0,0,],[0,0,],[0,0,],[0,0,]];
            let pARR =extendedHitboxDrawpoints[0];
            pARR[0] = this.drawPoints[0][0]+(-1)*drawSettings.seatController.radius*Math.sin(this.rotation)+(-1)*drawSettings.seatController.radius*Math.cos(this.rotation);
            pARR[1] = this.drawPoints[0][1]+(-1)*drawSettings.seatController.radius*Math.cos(this.rotation)+(-1)*drawSettings.seatController.radius*Math.sin(this.rotation);
            pARR = extendedHitboxDrawpoints[1];
            
            pARR[0] = this.drawPoints[1][0]+(1)*drawSettings.seatController.radius*Math.sin(this.rotation)+(1)*drawSettings.seatController.radius*Math.cos(this.rotation);
            pARR[1] = this.drawPoints[1][1]+(-1)*drawSettings.seatController.radius*Math.cos(this.rotation)+(-1)*drawSettings.seatController.radius*Math.sin(this.rotation);
            pARR = extendedHitboxDrawpoints[2];
            
            pARR[0] = this.drawPoints[2][0]+(1)*drawSettings.seatController.radius*Math.sin(this.rotation)+(1)*drawSettings.seatController.radius*Math.cos(this.rotation);
            pARR[1] = this.drawPoints[2][1]+(1)*drawSettings.seatController.radius*Math.cos(this.rotation)+(1)*drawSettings.seatController.radius*Math.sin(this.rotation);
            pARR = extendedHitboxDrawpoints[3];
            
            pARR[0] = this.drawPoints[3][0]+(-1)*drawSettings.seatController.radius*Math.sin(this.rotation)+(-1)*drawSettings.seatController.radius*Math.cos(this.rotation);
            pARR[1] = this.drawPoints[3][1]+(1)*drawSettings.seatController.radius*Math.cos(this.rotation)+(1)*drawSettings.seatController.radius*Math.sin(this.rotation);
            //console.log(extendedHitboxDrawpoints);
            //console.log(this.drawPoints);
            if(ifPointInRectangle(x, y, extendedHitboxDrawpoints, "extraHitbox")){
                console.log("[TRUE]");
                return true
            }
        }else{
            let distanceCheck = drawSettings.seat.width+drawSettings.seatController.radius + tableScales.circle.width + drawSettings.seatController.extraHitbox;
            let difx = x-this.x;
            let dify = y-this.y;
            let distanceToMouse = Math.sqrt(difx*difx + dify*dify);
            if(distanceToMouse <= distanceCheck){
                return distanceToMouse;
            }
            
        }
        return false;
    }


    async drawMyself(){
        let halvparten =(ctx.measureText(this.descriptor).width/2);
        if(this.bordType =="langbord"){
            //RECTANGLE
            ctx.lineWidth = this.lineWidth;
            //ctx.fillStyle = "white";
            //ctx.strokeStyle = this.strokeColor;
            //console.log(ctx.strokeStyle + " : "+this.strokeColor );
            //ctx.fillRect(this.x, this.y, this.width, this.height);
            //ctx.fill();
            //ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.strokeStyle = this.strokeColor;
            ctx.fillStyle = this.fillColor;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.drawPoints[1][0],this.drawPoints[1][1]);
            ctx.lineTo(this.drawPoints[2][0],this.drawPoints[2][1]);
            ctx.lineTo(this.drawPoints[3][0],this.drawPoints[3][1]);
            ctx.lineTo(this.x, this.y);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.fillStyle = red;
            
            //console.log(halvparten);
            ctx.fillText(this.descriptor, this.descriptorX-halvparten, this.descriptorY);
        }else if(this.bordType =="rundbord"){
            //CIRCLE
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeColor;
            ctx.fillStyle = this.fillColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.height, 0, 2*Math.PI, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = red;
            ctx.fillText(this.descriptor, this.x-halvparten, this.y);
            ctx.fillStyle ="white";
        }
        ctx.lineWidth ="7";
        this.seats.drawSeats();

    }




    addPersonToTable(person){
        this.persons.push(person);
    }
    removePersonFromTable(person){
        for(let i = 0; i<this.persons.length; i++){
            if(this.persons[i].getId() === person.getId()){
                this.persons.splice(i,1);
            }else if(this.persons[i] === person){
                this.persons.splice(i,1);
            }
            
        }
        for(let i=0; i<this.unseatedPersons.length; i++){
            if(this.unseatedPersons[i].getId() === person.getId()){
                this.unseatedPersons.splice(i,1);
            }else if(this.unseatedPersons[i] === person){
                this.unseatedPersons.splice(i,1);
            }
        }
    }

}