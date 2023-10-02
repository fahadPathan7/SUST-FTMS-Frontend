const tournamentTitle = document.getElementById("tournamentTitle");

tournamentTitle.textContent = localStorage.getItem("tournamentName");

function toHome(){
    window.location.href = "home.html";
}