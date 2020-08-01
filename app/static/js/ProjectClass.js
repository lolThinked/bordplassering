class Project{
    constructor(room, name, id, guests, allowedModerators,creationDate, creationUser, plannedDate){
        this.room = room || undefined;
        this.name = name || "Ditt Prosjekt";
        this.id = id || generateID();
        this.guests = guests || [];
        this.allowedModerators = allowedModerators || [];
        this.creationDate = new Date(creationDate) || new Date().getTime();
        this.creationUser = creationUser || undefined; // Pointer ID
        this.plannedDate = new Date(plannedDate) || undefined;
        console.log(this);
        this.setCreationDate();
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
}