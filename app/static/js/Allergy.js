class Allergy{
    constructor(name, tags, description, advice, id, color){
        if(arguments.length == 1 && (typeof(arguments[0]) === "object")){
            let inData = arguments[0];
            this.name = inData.name || "Ingen navn";
            this.tags = inData.tags || "Ingen tag";
            this.description = inData.description || "Ingen beskrivelse";
            this.advice = inData.advice || "Ingen råd";
            this.id = inData.id || generateID();
            this.color = inData.color || false;
        }else{
            this.name = name || "Ingen navn";
            this.tags = tags || "Ingen tag";
            this.description = description || "Ingen beskrivelse";
            this.advice = advice || "Ingen råd";
            this.id = id || generateID();
            this.color = color || false;
        } 
    }
    setName(name){
        this.name = name;
    }
    addTag(tag){
        this.tags.push(tag);
    }
    removeTag(tag){
        for(let i=0; i<this.tags.length; i++){
            if(tag == this.tags[i]){
                this.tags.splice(i,1);
                break;
            } 
        }
        return false;
    }
    setDescription(description){
        this.description = description;
    }
    setAdvice(advice){
        this.advice = advice;
    }
    setColor(color){
        this.color = color;
    }
    getName(){
        return this.name;
    }
    getTag(){
        return this.tags;
    }
    getDescription(){
        return this.description;
    }
    getAdvice(){
        return this.advice;
    }
    getColor(){
        return this.color;
    }
    returnAsObject(){
        let tempObject ={};
        tempObject.name = this.name;
        tempObject.tags = this.tags;
        tempObject.description = this.description;
        tempObject.advice = this.advice;
        tempObject.id = this.id;
        tempObject.color = this.color;
        return tempObject;
    }
    getId(){
        return this.id;
    }
}

class GlutenIntoleranse extends Allergy{
    static #staticAntall = 0;
    constructor(){
        super("GlutenIntoleranse", "GLT-I", "Gluten intoleranse", "Skal ikke serveres gluten");
        increaseAntall();
        //GlutenIntoleranse.#staticAntall++;
        //this.#staticAntall += 1;
        console.log(GlutenIntoleranse.#staticAntall);
    }

    increaseAntall(){
        GlutenIntoleranse.#staticAntall++;
    }
    getAmount(){
        return GlutenIntoleranse.#staticAntall;
    }
}

class NoAlchohol extends Allergy{
    static #staticAntall = 0;
    constructor(name, tag, description, advice){
        super(name || "Ikke-Alkohol", tag || "ALK-ikke", description || "Drikker ikke alkohol", advice || "Drikker ikke alkohol");
        increaseAntall();
        //GlutenIntoleranse.#staticAntall++;
        //this.#staticAntall += 1;
        console.log(NoAlchohol.#staticAntall);
    }

    increaseAntall(){
        NoAlchohol.#staticAntall++;
    }
    getAmount(){
        return NoAlchohol.#staticAntall;
    }
}
class U18 extends NoAlchohol{
    static #staticAntall = 0;
    constructor(){
        super("Ikke-Alkohol", "U-18", "Får ikke drikke alkohol", "Ikke server alkhol til denne personen");
        increaseAntall();
        //GlutenIntoleranse.#staticAntall++;
        //this.#staticAntall += 1;
        console.log(U18.#staticAntall);
    }

    increaseAntall(){
        U18.#staticAntall++;
    }
    getAmount(){
        return U18.#staticAntall;
    }
}


/*
        this.name = "GlutenIntoleranse";
        this.tag = "GLT-I";
        this.description = "Gluten intoleranse";
        this.advice = "Skal ikke serveres gluten";
        */