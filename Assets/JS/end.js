// Variables to reference elements
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

// Pull high scores from localstorage or set to empty array
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

// How many high scores will be displayed
const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', function () {
        saveScoreBtn.disabled = !username.value
    })

// Function for saving high scores
saveHighScore = function (e) {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort(function (a, b) {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('highscores.html')

}