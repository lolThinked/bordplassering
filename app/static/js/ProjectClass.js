class Project{
    constructor(room, name, id, allowedModerators,creationDate, creationUser){
        this.room = room || undefined;
        this.name = name || "Ditt Prosjekt";
        this.id = id || generateID();
        this.guests = [];
        this.allowedModerators = allowedModerators || [];
        this.creationDate = creationDate;
        this.creationUser = creationUser; // Pointer
    }
    
}