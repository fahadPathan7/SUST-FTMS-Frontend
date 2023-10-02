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
    const eventName = document.getElementById("eventName");
    const eventYear = document.getElementById("eventYear");

    postANewTournament(eventName,eventYear);

    eventName.value = "";
    eventYear.value = "";
    closeForm();
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName == "IMG" && !e.target.parentElement.classList.contains('eventAdd')){
        const clickedCard = e.target.closest(".card");
        const tournamentTitle = clickedCard.querySelector('h3').textContent;

        localStorage.setItem("tournamentName",tournamentTitle);
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
            showInList(data);
        })
        .catch(error => console.log(error));
}

function showInList(data){
    let newCard = document.createElement("div");
    newCard.className = "card";

    const tournamentName = data.tournamentName;
    const tournamentYear = data.tournamentYear;

    const headingText = tournamentName+"-"+tournamentYear;

    newCard.innerHTML = `
            <img src="${fixedImage}" alt="Task Image">
            <h3>${headingText}</h3>
    `

    listContainer.appendChild(newCard);
}

const getTournamentList = () => {
    fetch('http://localhost:5000/api/tournaments')
        .then(response => {
            if (!response.ok) {
                throw new Error(`ERROR: ${response.status}`);
            }
            return response.json();
        })
        .then(dataArray => {
            console.log(dataArray);
            dataArray.forEach(function(item) {
                console.log(item);
                let newCard = document.createElement("div");
                newCard.className = "card";

                // const tournamentId = item.tournamentId;
                const tournamentName = item.tournamentName;
                const tournamentYear = item.tournamentYear;

                const headingText = tournamentName+"-"+tournamentYear;

                newCard.innerHTML = `
                    <img src="${fixedImage}" alt="Task Image">
                    <h3>${headingText}</h3>
                `;

                listContainer.appendChild(newCard);
            });
        })
        .catch(error => console.log(error));
}

getTournamentList();