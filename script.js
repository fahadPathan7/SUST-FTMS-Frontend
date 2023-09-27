const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");
const formPopup = document.querySelector(".form-popup");
let showForm = document.getElementById("eventForm");
const listContainer = document.getElementById("content-section");
const fixedImage = "Images/football.png";

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
    let newCard = document.createElement("div");
    newCard.className = "card";
    const eventName = document.getElementById("eventName");
    const eventYear = document.getElementById("eventYear");
    const headingText = eventName.value+"-"+eventYear.value;

    
    newCard.innerHTML = `
            <img src="${fixedImage}" alt="Task Image">
            <h3>${headingText}</h3>
        `;

    listContainer.appendChild(newCard);

    eventName.value = "";
    eventYear.value = "";
    closeForm();
}