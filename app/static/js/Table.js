class Table{
    constructor(drawObject, guests){
        this.drawObject = drawObject;
        this.guests = [];
        this.seats = new SeatController(drawObject);
        this.seats.addGuests(guests);
    }


    addGuest(guest){
        this.guests.push(guest);
        this.seats.addGuest(guest);
    }
}