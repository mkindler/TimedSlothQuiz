const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// Set questions, choices, and answers
let questions = [
    {
        question: "How many types of sloths exist?",
        choice1: "Two",
        choice2: "Three",
        choice3: "Four",
        choice4: "Five",
        answer: 1,
    },
    {
        question: "Sloths possess a __________ relationship with the algae that grows on their fur?",
        choice1: "competitive",
        choice2: "predatorial",
        choice3: "symbiotic",
        choice4: "parasitic",
        answer: 3,
    },
    {
        question: "How much of a sloth's life is spent hanging upside down?",
        choice1: "30%",
        choice2: "50%",
        choice3: "70%",
        choice4: "90%",
        answer: 4,
    },
    {
        question: "Which of the following animals is actually slower than the sloth?",
        choice1: "Starfish",
        choice2: "Koala",
        choice3: "Ummm, none. Sloth wins.",
        choice4: "Gila Monster",
        answer: 3,
    },
    {
        question: "How far does a sloth typically travel over the course of one day?",
        choice1: "125 feet",
        choice2: "85 feet",
        choice3: "400 feet",
        choice4: "5,280 feet",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
