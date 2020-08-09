class Person{
    constructor(firstName, surName, age, gender, email, allergies, id, table, seat){
        if(arguments.length == 1 && (typeof(arguments[0]) === "object")){
            //check if they are object for import
            let inData = arguments[0];
            this.firstName = inData.firstName || undefined;
            this.surName = inData.surName || undefined;
            this.age = inData.age || undefined;
            this.gender = inData.gender || undefined;
            this.email = inData.email || undefined;
            this.allergies = inData.allergies || [];
            this.id = inData.id || generateID();
            this.table = this.setTable(inData.table);
            this.seat = this.setSeat(inData.seat);
            
        }else{
            this.firstName = firstName || undefined;
            this.surName = surName || undefined;;
            this.age = age || undefined;;
            this.gender = gender || undefined;;
            this.email = email ||undefined;
            this.allergies = allergies || [];
            this.id = id || generateID();
            this.table = table || undefined; //pointer
            this.seat = seat || undefined;
        }
        this.x =0;
        this.y=0;
        this.drawingObject = undefined;
    }

    exportWithoutPointers(){
        let tempObj = {};

        tempObj.firstName = this.firstName;
        tempObj.surName = this.surName;
        tempObj.age = this.age;
        tempObj.gender = this.gender;
        tempObj.email = this.email;
        tempObj.allergies = [];
        for(let i =0; i<this.allergies.length; i++){
            this.allergies[i].getId();
        }
        tempObj.id = this.id;
        if(this.table !=undefined){
            tempObj.table = this.table.getId();
        }else{
            tempObj.table = "undefined";
        }
        if(this.seat != undefined){
            tempObj.seat = this.seat.getId();
        }else{
            tempObj.seat = "undefined";
        }
       
        return tempObj;
    }

    drawMyself(x,y){
        ctx.fillStyle = drawSettings.person.color;
        ctx.fillRect(x,y-5,40,40);
        ctx.fillStyle = drawSettings.standard.fillColor;
        //ctx.fillText("🧍", x, y);
    }
    setPosition(x,y){

    }
    
    setSeat(seat){
        if(seat != "undefined"&& seat!=undefined){
            return seat
        }else{
            return undefined
        }
    }
    setTable(table){
        if(table != "undefined"&& table!=undefined){
            return table
        }else{
            return undefined
        }
    }
    removeTableFromPerson(){
        this.table = undefined;
    }

    getFullName(){
        return this.firstName + " " + this.surName;
    }
    getFirstName(){
        return this.firstName;
    }
    getSurname(){
        return this.surName;
    }

    //ADDS and allergy reference to the allergy list
    addAllergy(allergy){
        this.allergies.Push(allergy);
    }
    

    getDataForLoadPerson(){
        let returnData =[];
        returnData.push(this.firstName);
        returnData.push(this.surName);
        returnData.push(this.age);
        returnData.push(this.gender);
        return returnData;
    }
    getAllergies(){
        return this.allergies;
    }
    getTable(){
        return this.table;
    }
    getSeat(){
        return this.seat;
    }

    setTable(table){
        this.table = table;
    }
    setSeat(seat){
        this.seat = seat;
    }
    setFirstname(name){
        this.firstName = name;
    }
    setSurname(name){
        this.surName = name;
    }
    setAge(age){
        this.age = age;
    }
    setGender(gender){
        this.gender = gender;
    }
    

    getId(){
        return this.id;
    }
    
    export(){
        return self.JSON;
    }
}
