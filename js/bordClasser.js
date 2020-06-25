let idCounter = 1;
class Bord{
    constructor(positionX, positionY, bordType, rotation, descriptor){
        this.x = positionX;
        this.y = positionY;
        this.bordType = bordType;
        this.id = idCounter;
        idCounter++;
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
            this.rotate(rotation);
            //this.vectorDiagonal = Math.sqrt(Math.pow(this.width, 2)+Math.pow(this.height, 2));
            //console.log(this.vectorDiagonal);
        }else if(bordType =="rundbord"){
            this.height = this.width= tableScales.circle.width;
            this.total = 8;
            this.descriptorX = (this.x + this.width/2);
            this.descriptorY = this.y + this.height/2;
        }
        

    }
    rotate(angle){
        //console.log(this.drawPoints);
        if(angle ==0 || angle ==undefined){
            return
        }
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
    }
    turnRight(){
        let tempHeight = this.height;
        let tempWidth = this.width;
        this.width = tempHeight;
        this.height = tempWidth;
    }
    returnId(){
        let intel = this.id;
        return intel;
    }
    returnForDrawing(){
        var arrayMedInfo = [this.x, this.y, this.bordType];
        if(this.bordType == "langbord"){
            //console.log("TEST");
            arrayMedInfo.push(this.width);
            arrayMedInfo.push(this.height);
            //arrayMedInfo.push("TESTINFO");
        }else if(this.bordType == "rundbord"){
            //console.log("BUG");
            arrayMedInfo.push(this.height);
        }

        return arrayMedInfo;
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
    retturnArea(){
        return this.width * this.height;
    }
    returnPeople(){
        return this.total;
    }
    returnType(){
        return this.bordType;
    }
    returnPosition(){
        return [this.x, this.y];
    }
    returnDistanceToMouse(){
        return [this.distanceToMouseX, this.distanceToMouseY];
    }

    returnForExport(){
        let exportObj ={
            
        }
        exportObj.x = this.x;
        exportObj.y = this.y;
        exportObj.bordType = this.bordType;
        exportObj.rotation = this.rotation;
        exportObj.descriptor = this.descriptor;
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
            ctx.fillStyle = "red";
            ctx.fillText(this.descriptor, this.descriptorX, this.descriptorY);
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
            ctx.fillText(this.descriptor, this.x+(this.width/2), this.y+(this.height/2));
        }
        ctx.lineWidth ="7";
    }

}