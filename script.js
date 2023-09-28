const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");
const formPopup = document.querySelector(".form-popup");

let showForm = document.getElementById("eventForm");

const listContainer = document.getElementById("content-section");
const fixedImage = "Images/football.png";

const backToHome = document.getElementById("backToHome");

loginSignupLink.forEach(link => {
    link.addEventListener("click",(e)=>{
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    })
})

function openForm(){
    showForm.classList.add("open-eventForm");
}

function closeForm(){
    showForm.classList.remove("open-eventForm");
}


function addEvent(){
    // let newCard = document.createElement("div");
    // newCard.className = "card";
    const eventName = document.getElementById("eventName");
    const eventYear = document.getElementById("eventYear");
    const headingText = eventName.value+"-"+eventYear.value;

    
    // newCard.innerHTML = `
    //         <img src="${fixedImage}" alt="Task Image">
    //         <h3>${headingText}</h3>
    //     `;

    // listContainer.appendChild(newCard);

    postANewTournament(eventName,eventYear);

    // getTournamentList();

    eventName.value = "";
    eventYear.value = "";
    closeForm();
}

listContainer.addEventListener("click",function(e){
    const selectedCard = document.querySelector('.eventAdd');
    if(e.target.tagName == "IMG" && !e.target.parentElement.classList.contains('eventAdd')){
        window.location.href = 'tournament.html';
    }
},false);


function toHome(){
    window.location.href = "home.html";
}

// post resource. create
const postANewTournament = (eventName,eventYear) => {
    fetch('http://localhost:5000/api/tournament', {
        method: 'POST',
        body: JSON.stringify({
            tournamentId: eventName.value+"-"+eventYear.value,
            tournamentName: eventName.value,
            tournamentYear: eventYear.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            getTournamentList();
        })
        .catch(error => console.log(error));

    //getTournamentList();
}


const getTournamentList = () => {
    fetch('http://localhost:5000/api/tournaments')
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: ${response.status}");
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            // const dataArray = JSON.parse(data);

            // // console.log(dataArray);
            // dataArray.forEach(function(item){

            //     console.log(item);
            //     // let newCard = document.createElement("div");
            //     // newCard.className = "card";
        
            //     // const tournamentId = item.tournamentId;
            //     // const tournamentName = item.tournamentName;
            //     // const tournamentYear = item.tournamentYear;
        
            //     // const headingText = tournamentName+"-"+tournamentYear;
        
            //     // newCard.innerHTML = `
            //     //     <img src="${fixedImage}" alt="Task Image">
            //     //     <h3>${headingText}</h3>
            //     // `;
        
            //     // listContainer.appendChild(newCard);
            // });
        })
        .catch(error => console.log(error));

    // const dataArray = JSON.parse(data);

    
}