class Project{
    constructor(room, name, id, guests, allowedModerators,creationDate, creationUser){
        this.room = room || undefined;
        this.name = name || "Ditt Prosjekt";
        this.id = id || generateID();
        this.guests = guests || [];
        this.allowedModerators = allowedModerators || [];
        this.creationDate = new Date(creationDate) || new Date().getTime();
        this.creationUser = creationUser; // Pointer ID
    }
    
}