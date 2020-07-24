class Obstacle{
    constructor(positionX, positionY, obstacleType, obstacleLength, obstacleHeight, descriptor){
        this.x = positionX;
        this.y = positionY;
        this.obstacleType = obstacleType;
        this.width = 0;
        this.height = 0;
        this.descriptor = descriptor || "";
        if(obstacleType == "rect"){
            this.width = obstacleLength;
            this.height = obstacleHeight;
        }else if(obstacleType =="circle"){
            this.height = this.width= obstacleLength; 
        }
    }
    returnObstacle(){
        let tempType;
        if(this.bordType == "langbord"){
            tempType =  "rect";
        }else if(this.bordType == "rundbord"){
            tempType = "circle";
        }
        let tempArray = [this.x, this.y, this.width, this.height, tempType];
        return tempArray;
    }


    returnPosition(){
        return [this.x, this.y];
    }
    updatePosition(x,y){
        this.x = x;
        this.y = y;
    }
    checkSelf(x,y){
        if(this.obstacleType !="circle"){
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
        if(this.obstacleType =="rect"){
            //RECTANGLE
            ctx.fillStyle = "white";
            ctx.strokeStyle = darkGrey;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            //ctx.fill();
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.strokeStyle = darkGrey;
            ctx.fillStyle = "black";
            ctx.fillText(this.descriptor, (this.x+this.width/2)-(this.descriptor.length*7), this.y+(this.height/2));
            ctx.fillStyle = "black";
        }else if(this.obstacleType =="circle"){
            //CIRCLE
            ctx.fillStyle = "blue";
            ctx.strokeStyle = darkGrey;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.height, 0, 2*Math.PI, false);
            ctx.fill();
            ctx.fillText(this.descriptor, this.x+(this.width/2), this.y+(this.height/2));
            
        }
    }

}