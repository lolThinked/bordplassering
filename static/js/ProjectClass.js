class Project{
    constructor(room, name, id){
        this.room = room || undefined;
        this.name = name || "Ditt Prosjekt";
        this.id = id || generateID();
    }
    
}