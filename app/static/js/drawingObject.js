class drawingObject{
    constructor(positionX, positionY, type, rotation, descriptor, name,id){
        this.x = positionX || 400;
        this.y = positionY || 300;
        this.type = type || "langbord";
        this.id = id || generateID();
        this.name = name || "gi navn";
        this.width = 0; 
        this.height = 0; 
        this.total = 0;
        this.strokeColor = blue; 
        this.fillColor = "white"; 
        this.lineWidth = "5";
        this.descriptor = descriptor || "";
        this.rotation = 0; 
        this.distanceToMouseX; 
        this.distanceToMouseY;
        this.descriptorX = (this.x + this.width/2);
        this.descriptorY = (this.y + this.height/2);
        this.refToObject;
        this.drawPoints;
        if(this.type ==="person"){
            this.width = 40;
            this.height = 40;
            this.total = 8;
            this.drawPoints = [
                [this.x, this.y],
                [this.x + this.width, this.y],
                [this.x + this.width, this.y+this.height],
                [this.x, this.y+this.height]
            ];
            this.descriptorX = (this.x + this.width/2);
            this.descriptorY = this.y + this.height/2;
            this.rotate(rotation);
        }else if(bordType == "langbord"){
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
            this.rotate(rotation);
            //this.vectorDiagonal = Math.sqrt(Math.pow(this.width, 2)+Math.pow(this.height, 2));
            //console.log(this.vectorDiagonal);
        }else if(bordType =="rundbord"){
            this.height = this.width= tableScales.circle.width;
            this.total = 8;
            this.descriptorX = (this.x + this.width/2);
            this.descriptorY = this.y + this.height/2;
        }
        //this.seats = new SeatController(this);
        //person 
    }
    addReferenceFromId(project){
        this.refToObject = project.getGuestById(this.id);
    }
    getReferenceObject(){
        return this.refToObject;
    }
    addGuest(guest){
        return
    }
    getId(){
        return this.id;
    }
    rotate(angle){
        //console.log(this.drawPoints);
        if(angle ==0 || angle ==undefined){
            return
        }
        if(this.bordType =="lanbord"){
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
            this.rotation += angle;
            //console.log(this.drawPoints[1][0]);
        }else{
            return
        }
    }
    returnTable(){
        let tempType;
        if(this.type == "langbord"){
            tempType =  "rect";
        }else if(this.type == "rundbord"){
            tempType = "circle";
        }
        let tempArray = [this.x, this.y, this.width, this.height, tempType];
        return tempArray;
    }
    returnPositionInfo(){
        let tempArray = [];
        let tempType;
        if(this.type == "langbord"){
            tempType = "rect";
            tempArray = [tempType, this.drawPoints, this.angle];
        }else if(this.type == "rundbord"){
            tempType = "circle";
            tempArray = [tempType, this.x, this.y, this.width, this.height];
        }else if(this.type == "person"){
            tempType = "person";
            tempArray = [tempType, this.drawPoints, this.angle];
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
        return this.type;
    }
    returnPosition(){
        return [this.x, this.y];
    }
    returnCenter(){
        let centerX;
        let centerY;
        if(this.type == "langbord"){
            centerX = this.descriptorX;
            centerY = this.descriptorY;
        }else if(this.type == "rundbord"){
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
        exportObj.type = this.type;
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
        if(this.type =="langbord"){
            //console.log(this.type);
            for(let i = 0; i<this.drawPoints.length; i++){
                this.drawPoints[i][0] -= diffX;
                this.drawPoints[i][1] -= diffY;
            }
        }
    }
    //UPDATES POSITION TO MOUSE POSITION with Diff from mouse
    updatePositionNEW(x,y){
        //If PERSON HAS SEAS, remove distance from mouse because otherwise the postition of the Person is changed by the mouse.
        //Removes 10 from x and y to center the Person drawobject
        if(this.distanceToMouseX == undefined){
            this.distanceToMouseX = 0;
            this.distanceToMouseY = 0;
        }
        //console.log(x);
        if(this.type =="person"){
            if(this.refToObject != undefined){
                if(this.refToObject.getSeat() != undefined){
                    //let tmpPos = this.refToObject.getSeat().getPosition();
                    //this.setDistanceToMouse(tmpPos[0], tmpPos[1]);
                    x += this.distanceToMouseX;
                    y += this.distanceToMouseY;
                    x -=20;
                    y -=20;
                }
            }
        }
        
        //console.log(x);
        //console.log(this.distanceToMouseX);
        x -= this.distanceToMouseX;
        y -= this.distanceToMouseY;
        let diffX = this.x-x;
        let diffY = this.y-y;
        //this.x = x-this.distanceToMouseX;
        //this.y = y-this.distanceToMouseY;
        //console.log(x);
        this.x = x;
        this.y = y;
        if(this.type =="langbord" || this.type=="person"){
            //console.log(this.type);
            for(let i = 0; i<this.drawPoints.length; i++){
                this.drawPoints[i][0] -= diffX;
                this.drawPoints[i][1] -= diffY;
            }
        }
        
        this.descriptorX -= diffX;
        this.descriptorY -= diffY;
        if(this.type == "langbord"||this.type =="rundbord"){
            this.seats.updatePosition();
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
        if(this.type =="langbord" || this.type =="person"){
            //console.log(this.type);
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
        if(this.type !="rundbord"){
            if(x >= this.x && x <= (this.x+this.width)){
                if(y >= this.y && y <= (this.y+this.height)){
                    var difference = [this.x-x, this.y-y];
                    return difference;
                }
            }
        }else{
            if(x >= (this.x-this.height) && x <= (this.x+this.width)){
                if(y >= (this.y-this.height) && y <= (this.y+this.height)){
                    var difference = [this.x-x, this.y-y];
                    return difference;
                }
            }
        }
        
        return false;
    }
    drawMyself(){
        let halvparten;
        if(this.type =="langbord"){
            //RECTANGLE
            halvparten =(ctx.measureText(this.descriptor).width/2);
            ctx.lineWidth = this.lineWidth;
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
        }else if(this.type =="rundbord"){
            //CIRCLE
            halvparten =(ctx.measureText(this.descriptor).width/2);
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
        }else if(this.type ==="person"){
            //PERSON
            ctx.font = drawSettings.person.font;
            halvparten =(ctx.measureText(this.descriptor).width/2);

            //this.refToObject.drawMyself(this.x,this.y);
            ctx.lineWidth = this.lineWidth;
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

            ctx.fillStyle = drawSettings.person.textColor;
            ctx.lineWidth= drawSettings.person.textStrokeWidth;
            ctx.strokeStyle = drawSettings.person.textStroke;
            ctx.fillText(this.descriptor, this.descriptorX-halvparten, this.descriptorY);
            ctx.strokeText(this.descriptor, this.descriptorX-halvparten, this.descriptorY);
            let textHeight = ctx.measureText(this.descriptor).height;
        }
        ctx.strokeStyle = drawSettings.standard.strokeColor;
        ctx.lineWidth =drawSettings.standard.lineWidth;
        ctx.fillStyle = drawSettings.standard.fillColor;
        ctx.font = drawSettings.standard.font;
        //this.seats.drawSeats();

    }


    removeReference(){
        //Used in Delete and save Person function
        this.refToObject = undefined;
    }

    addPersonToTable(person){
        this.persons.push(person);
    }
    removePersonFromTable(person){
        for(let i = 0; i<persons.length; i++){
            if(persons[i] === person){
                this.persons.splice(i,1);
            }
        }
    }
}