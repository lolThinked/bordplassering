class Project{
    constructor(room, name, id, guests,creationDate, creationUser, plannedDate){
        this.room = room || undefined;
        this.name = name || "Ditt Prosjekt";
        this.id = id || generateID();
        this.guests = guests || [];
        this.creationDate = new Date(creationDate) || new Date();
        this.creationUser = creationUser || undefined; // Pointer ID
        this.plannedDate = new Date(plannedDate) || undefined;
        console.log(this);
        if(this.creationDate == undefined){
            this.setCreationDate();
        }
    }
    
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    addGuest(person){
        this.guests.push(person);
    }
    removeGuest(person){
        for(let i=0; i<this.guests.length; i++){
            if(this.guests[i] == person){
                this.guests.slice(i,1);
            }
        }
    }
    getGuests(){
        return this.guests;
    }


    setDate(date){
        this.plannedDate = new Date(date);
    }
    getDateText(){
        if(this.plannedDate == undefined){
            return "Skriv inn dato"
        }else{
            return this.plannedDate.toDateString();
        }
    }


    setCreationDate(){
        this.creationDate = new Date().getTime();
    }


    exportForJson(){
        let tempObj = {};
        //project
        let tmpOBJ = {};
        tmpOBJ.room= this.room;
        tmpOBJ.name = this.name;
        tmpOBJ.id = this.id;
        tmpOBJ.guests = [];
        for(let i=0; i<this.guests.length;i++){
            tmpOBJ.guests.push(this.guests[i].getId());
        }
        tmpOBJ.creationDate = this.creationDate.toUTCString();
        tmpOBJ.creationUser = this.creationUser;
        if(this.plannedDate != undefined){
            tmpOBJ.plannedDate = this.plannedDate.toUTCString();
        }else{
            tmpOBJ.plannedDate = "undefined";
        }
        tempObj.project = tmpOBJ;
        //guests
        let tmpARY = [];
        for(let i=0;i<this.guests.length;i++){
            tmpARY.push(this.guests[i].exportWithoutPointers());
        }
        tempObj.guests = tmpARY;

        //drawing



        return tempObj;
    }
}