class Project{
    constructor(room, name, id, guests,creationDate, creationUser, plannedDate){
        if(arguments.length == 1 && (typeof(arguments[0]) === "object")){
            //check if they are object for import
            let inData = arguments[0];
            let projectData = inData.project;
            this.room = projectData.room || undefined;
            this.name = projectData.name || undefined;
            this.id = projectData.id || generateID();
            this.creationDate = new Date(projectData.creationDate);
            this.creationUser = projectData.creationUser || undefined;
            this.plannedDate = new Date(projectData.plannedDate) || undefined;
            this.guests = [];
            //DRAWING
            //loadTables(inData.drawing.tables);
            this.drawing = {};
            this.drawing.tables = bord || undefined;
            //PERSON
            
            //console.log(guests);
            this.addGuestByList(inData.guests);
            //console.log(guests);
            startTegner(this.room);
            loadTables(inData.drawing.tables);
            loadPeopleIntoDrawing(this.guests, this);
        }else{
            this.room = room || undefined;
            this.name = name || "Ditt Prosjekt";
            this.id = id || generateID();
            this.guests = guests || [];
            this.creationDate = new Date(creationDate) || new Date();
            this.creationUser = creationUser || undefined; // Pointer ID
            this.plannedDate = new Date(plannedDate) || undefined;
            console.log(this);
            
        }
        if(this.creationDate == undefined || this.creationDate == "Invalid Date"){
            console.log("[SETTING CREATION DATE] - PROJECT");
            this.setCreationDate();
        }
    }
    
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    getTables(){
        if(this.drawing != undefined){
            return this.drawing.tables;
        }else{
            return undefined
        }
    }
    addGuestByList(liste){
        console.log("[PROJECT] - Added guest");
        //console.log(person);
        /*
        if(Array.isArray(liste)){
            if(typeof(liste[0]) =="string"){
                for(let i=0; i<liste.length; i++){
                    getPersonById(liste[i]);
                }
            return
            }
        }
        */
       console.log(liste);
       for(let person in liste){
           console.log(liste[person]);
           console.log(liste);
           this.guests.push(new Person(liste[person]));
       }
    }
    addGuest(person){
        console.log("[PUSHED] GUEST");
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
    getGuestById(id){
        let guest;
        for(guest in this.guests){
            if(this.guests[guest].getId() === id){
                return this.guests[guest];
            }
        }
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

    getId(){
        return this.id;
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
        try{
            tmpOBJ.creationDate = this.creationDate.toUTCString();
        }catch(e){
            console.error();
            try{
                tmpOBJ.creationDate = this.creationDate;
            }catch(e){
                console.error();
            }
        }
        
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

        let tmpDrawing= {};
        tmpDrawing.tables = [];
        for(let i=0; i<bord.length;i++){
            tmpDrawing.tables.push(bord[i].returnForExport());
        }

        
        tempObj.drawing = tmpDrawing;
        return tempObj;
    }
}