const questions = [
    {
        question: "What CSS property is used to add shadow to an element's text?",
        options: ["box-shadow", "text-shadow", "box-text", "element-shadow"],
        correctAnswer: "text-shadow"
    },

    {
        question: "Which JavaScript function is used to round a number to the nearest integer?",
        options: ["ceil()", "round()", "floor()", "random()"],
        correctAnswer: "round()"
    },

    {
        question: "Which JavaScript method is used to remove the first element from an array?",
        options: ["remove()", "pop()", "splice()", "shift()"],
        correctAnswer: "shift()"
    },

    {
        question: "In JavaScript, what is the purpose of the `JSON.parse()` method?",
        options: ["To parse XML data", "To parse JSON data", "To parse HTML data", "To create a new function"],
        correctAnswer: "To parse JSON data"
    },

    {
        question: "What does CSS `float: left;` property value do?",
        options: ["Floats the element to the right", "Floats the element to the center", "Floats the element to the left", "Does not affect element positioning"],
        correctAnswer: "Floats the element to the left"
    }
]
 
const quizContainer = document.querySelector('.quiz-container');
const gameContainer = document.querySelector('.game');
const timer = document.querySelector('.timer');
const quesNum = document.querySelector('.ques-number');
const questionBox = document.querySelector('.question');
const optionsContainer = document.querySelector('.options')
const optionsBox = Array.from(document.querySelectorAll('.options li'));
const nextQuesBtn = document.querySelector('.next-btn')
const playBtn = document.querySelector('.play-btn')
const startQuizBtn = document.querySelector('.start-quiz')
const instructionsBox = document.querySelector('.instructions')
const QcountBox = document.querySelector('.question-count span');
const topScoreBox = document.querySelector('.score span');
const resultBox = document.querySelector('.result');
const scoreCard = Array.from(document.querySelectorAll('.scorecard td'))
const finalStatement = document.querySelectorAll('.final-statement span')
const exitBtn = document.querySelector('.exit');
const nextLevelBtn = document.querySelector('.next-level');
const levelBox = document.querySelector('.level span');
let currentQIndex = 0;
let correctOptionIndex;
let quesNumCounter = 1;
let nextBtnTimeout;
let totalQuestions = questions.length;
let score = 0;
let levels = [5,10,15];   
let totalLevels = levels.length;
let levelIndex = 0;
let currentLevel;
let quesPerLevel;
let lastQuesIndex = -1;

function evalQuesPerLevel() {
    quesNumCounter = 1;
    nextQuesBtn.textContent = 'Next';
    quesPerLevel = levels[levelIndex]
    lastQuesIndex = lastQuesIndex + quesPerLevel;
    currentLevel = levelIndex + 1;
    levelIndex++;
}

function loadQuestion() {
    if (currentQIndex == lastQuesIndex) {
        nextQuesBtn.textContent = 'Show Result';
    }

    if (currentQIndex <= lastQuesIndex) {
        optionsContainer.style.pointerEvents = 'auto';
        nextQuesBtn.disabled = true;
        nextQuesBtn.classList.add('hidden');
        quesNum.textContent = quesNumCounter;
        QcountBox.textContent = `${quesNumCounter} of ${quesPerLevel}`;
        levelBox.textContent = currentLevel;
        timer.classList.remove('timer-animation');
        startTimer();
        const ques = questions[currentQIndex].question;
        questionBox.textContent = ques;
        const optionsText = questions[currentQIndex].options;

        optionsText.forEach((op, i) => {
            optionsBox[i].textContent = op;
            optionsBox[i].classList.remove('correctAnswer')
            optionsBox[i].classList.remove('incrorrectAnswer')

            if (op == questions[currentQIndex].correctAnswer) {
                correctOptionIndex = i;
            }
        })
        quesNumCounter++;
    }

    else {
        gameContainer.classList.add('hidden')
        showResult()
    }
}

function startTimer() {
    setTimeout(() => timer.classList.add('timer-animation'), 0)
    timer.style.animationPlayState = 'running';
    nextBtnTimeout = setTimeout(() => {
        nextQuesBtn.disabled = false
        optionsContainer.style.pointerEvents = 'none';
        autoSelected()
        scoreCard[2].textContent++;
        currentQIndex++;
        nextQuesBtn.classList.remove('hidden')
    }, 10000)
}

function skipTimer() {
    timer.style.animationPlayState = 'paused';
    nextQuesBtn.disabled = false;
    clearTimeout(nextBtnTimeout)
}

function selectedOption(event) {
    skipTimer();
    optionsContainer.style.pointerEvents = 'none';
    scoreCard[1].textContent++;
    nextQuesBtn.classList.remove('hidden')

    if (event.target.textContent == questions[currentQIndex].correctAnswer) {
        event.target.classList.add('correctAnswer')
        topScoreBox.textContent = ++score;
        scoreCard[3].textContent++;
    }
    else {
        event.target.classList.add('incrorrectAnswer')
        scoreCard[4].textContent++;
        autoSelected();
    }
    currentQIndex++;
}

function autoSelected() {
    optionsBox[correctOptionIndex].classList.add('correctAnswer')
}

function startGame() {
    scoreCard.forEach(element => element.textContent = 0)
    score = 0;
    topScoreBox.textContent = score;
    evalQuesPerLevel();
    loadQuestion()
    startQuizBtn.classList.add('hidden')
    instructionsBox.classList.add('hidden')
    gameContainer.classList.toggle('hidden')
    resultBox.classList.add('hidden');
}

function showInstructions() {
    playBtn.classList.add('hidden')
    quizContainer.classList.remove('hidden');
    instructionsBox.classList.remove('hidden');
}

function showResult() {
    nextLevelBtn.classList.remove('hidden');
    scoreCard[0].textContent = quesPerLevel;
    resultBox.classList.remove('hidden');
    finalStatement[0].textContent = ' ' + score;
    finalStatement[1].textContent = ' ' + quesPerLevel;
    if (currentQIndex == totalQuestions) {
        nextLevelBtn.disabled = true;
        nextLevelBtn.classList.add('hidden');
    }
}

function reset() {
    currentQIndex = 0;
    score = 0;
    levelIndex = 0;
    lastQuesIndex = -1;
    nextLevelBtn.disabled = false;
}
function exitQuiz() {
    reset();
    resultBox.classList.add('hidden');
    playBtn.classList.remove('hidden');
    startQuizBtn.classList.remove('hidden');
    quizContainer.classList.add('hidden');

}

nextQuesBtn.addEventListener('click', loadQuestion)
playBtn.addEventListener('click', showInstructions)
optionsBox.forEach((elem) => elem.addEventListener('click', selectedOption))
startQuizBtn.addEventListener('click', startGame)
exitBtn.addEventListener('click', exitQuiz)
nextLevelBtn.addEventListener('click', startGame)