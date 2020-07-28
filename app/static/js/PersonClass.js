class Person{
    constructor(firstName, surName, age, gender, email, allergies, id, table, seat){
        if(arguments.length == 1 && typeOf(arguments[0]) == "object"){
            //check if they are object for import
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
    export(){
        return self.JSON;
    }
}
