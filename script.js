console.log("Welocme to Local Commmunity Event Portal");
window.onload=function(){
    alert("Page Loaded Successfully");
}
const eventname="Holi Event";
const eventdate="29th March 2024";
let numberofseats=50;
console.log(`Event Name: ${eventname}`);
console.log(`Event Date: ${eventdate}`);
console.log(`Number of seats available: ${numberofseats}`);
function buttonfunction(){
    numberofseats--;
    console.log("Registration sucessfull");
    console.log(`Remaining seats: ${numberofseats}`);
}
let events=[
    {
        name:"Holi EVent",
        date:"2026-06-10",
        category:"festival",
        seats:50
    },
    {
        name:"Diwali Event",
        date:"2026-10-31",
        category:"festival",
        seats:100      
    },
    {
        name:"Christmas Event",
        date:"2026-12-25",
        category:"festivval",
        seats:0
    }
]
let today=new Date();
events.forEach(function(event){
    const eventdate=new Date(event.date);
    if(eventdate >today && event.seats>0){
        console.log(`${event.name} is available`);
    }
    else{
        console.log(`${event.name} is not available`);
    }
});
function registerForEvent(event){
    try{
        if(event.seats<=0){
            throw "No seats available for this event";
        }
    
        event.seats--;
        console.log("Registred for events");
        console.log(`Remaining seats: ${event.seats}`);
    }
    catch(error){
        console.log(`Error: ${error}`);
    }
}
registerForEvent(events[0]);
registerForEvent(events[1]);
registerForEvent(events[2]);
function addEvent(name,date,seats){
    events.push({
        name:name,
        date:date,
        seats:seats
    });
}
addEvent("New Year Event","2027-01-01",200);
addEvent("Easter Event","2027-04-10",150);
console.log("Updated Events List:");
events.forEach(function(event){
    console.log(`Name: ${event.name}, Date: ${event.date}, Seats: ${event.seats}`);
});
function registerUser(eventname){
    let found = false;
    events.forEach(function(event){
        if(event.name == eventname){
            found = true;
            if(event.seats > 0){
                event.seats--;
                console.log(`Registered for ${eventname}`);
                console.log(`Remaining seats: ${event.seats}`);
            }
            
            else{
                console.log("No seats available for this event");
            }
            
        }
    });
    if(!found){
       console.log("Event not found");

    }
}
function filterEventsByCategory(category){
    return events.filter(function(event){
        return event.category==category;
    })
}
function registrationTracker(){
    let totalregistered=0;
    return function(){
        totalregistered++;
        console.log(`Total registered users: ${totalregistered}`);
    };
}
const trackFestivalRegistration = registrationTracker();

function filterEvents(callback) {

    return events.filter(callback);

}

registerUser("Holi EVent");

trackFestivalRegistration();
trackFestivalRegistration();

console.log(filterEventsByCategory("Holi"));

const availableEvents = filterEvents(function(event) {

    return event.seats > 0;

});

console.log(availableEvents);
function Event(name,date,seats){
    this.name=name;
    this.date=date;
    this.seats=seats;
}
Event.prototype.checkAvailability=function(){
    if(this.seats>0){
        console.log(`${this.name} is available`);
    }
    else{
        console.log(`${this.name} is not available`);
    }
}

const event1= new Event("childern Day","2027-10-9",30);
const event2= new Event("Teachers Day","2026-10-09",70);
event1.checkAvailability();
event2.checkAvailability();
console.log(Object.entries(event1));
Object.entries(event1).forEach(function([key, value]){

    console.log(`${key}: ${value}`);

});
events.push({
    name:"Musical Events",
    date:"2027-10-19",
    seats:40

})
console.log(events);
const musicevents=events.filter(function(event){
    return event.category==="Musical";
});
console.log(musicevents);
const didplaycards=events.map(function(event){
    return `Workshop on: &{event.name}`;


});
console.log(didplaycards);
const container=document.querySelector("#forqueryselector");
const card=document.createElement("div");
card.innerHTML=`
    <h3>Musical</h3>
    <p id="seattext">seat 50</p>
    <br>
    <button id="registerbtn">Register</button>
    <button id="cancelbtn">Cancel</button>
    <br>

`;
container.appendChild(card);
const seatext=card.querySelector("#seattext");
const registerbutton=card.querySelector("#registerbtn");
const cancelbtn=card.querySelector("#cancelbtn");
let seats=50;
registerbutton.addEventListener("click",()=>{
    if(seats>=0){
        seats--;
        console.log(`Available seats: ${seats}`)
    }
});
cancelbtn.addEventListener("click",()=>{
    seats++;
    console.log(`Available seats: ${seats}`);
});
registerbutton.addEventListener("click", function () {
    if (seats > 0) {
        seats--;
        console.log("Registration successful");
        console.log(`Remaining seats: ${seats}`);
        seatext.textContent = `Seats: ${seats}`;
    } else {
        console.log("No seats available");
    }
});
document.getElementById("categoryFilter").onchange = function () {
    const selected = this.value;

    const filtered = events.filter(event => {
        return selected === "all" || event.category === selected;
    });

    console.log(filtered);
};
document.getElementById("searchBox").addEventListener("keydown", function () {

    const query = this.value.toLowerCase();

    const results = events.filter(event => {
        return event.name.toLowerCase().includes(query);
    });

    console.log(results);
});
const loading = document.getElementById("loading");
const output = document.getElementById("output");

loading.style.display = "block";
fetch("https://jsonplaceholder.typicode.com/posts")
.then(function(response){
    return response.json();
})
.then(function(data){

    loading.style.display = "none"; 

    output.innerHTML = data[0].title; 
})
.catch(function(error){
    loading.style.display = "none";
    console.log("Error");
});
async function getData() {

    loading.style.display = "block";

    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        let data = await response.json();

        loading.style.display = "none";

        output.innerHTML = data[0].title;

    } catch (error) {
        loading.style.display = "none";
        console.log("Error");
    }
}

getData();
const displaycards = events.map(function(event) {
    return `Workshop on: ${event.name}`;
});
console.log(displaycards);
fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "User",
        event: "Holi Event"
    })
})
.then(res => res.json())
.then(data => console.log("Success:", data))
.catch(err => console.log("Error:", err));
document.getElementById("eventForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = this.elements["name"].value;
    const email = this.elements["email"].value;

    if (!name || !email) {
        console.log("Please fill all fields");
        return;
    }

    console.log("Form submitted:", name, email);
});
let clonedEvents = [...events];
console.log(clonedEvents);
$("#registerbtn").click(function () {
    $("#seattext").fadeOut().fadeIn();
});
