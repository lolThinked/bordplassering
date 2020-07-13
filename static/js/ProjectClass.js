class Project{
    constructor(room, name, id){
        this.room = room;
        this.name = name || "Ditt Prosjekt";
        this.id = id || generateID();
    }
    
}