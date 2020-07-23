class Project{
    constructor(room, name, id, creationDate, creationUser){
        this.room = room || undefined;
        this.name = name || "Ditt Prosjekt";
        this.id = id || generateID();
        this.guests = [];
        
    }
    
}