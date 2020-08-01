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
