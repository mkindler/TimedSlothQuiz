// Pull high scores from localstorage or set to empty array
const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

// Writes high scores to page
highScoresList.innerHTML =
highScores.map(function (score) {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")

// Clears high scores from page
function clearHighscores() {
    window.localStorage.removeItem("highScores");
    window.location.reload();
}
  
document.getElementById("clear").onclick = clearHighscores;