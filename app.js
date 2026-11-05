
// Selecting HTML elements
const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alertBox = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// Questions array
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },

    {
        question: "Q. Which of the following is not a valid way to declare a function in Javascript?",
        choices: [
            "function myFunction() {}",
            "let myfunction = function() {};",
            "myFunction: function() {}"
        ],
        answer: "myFunction: function() {}"
    },

    {
        question: "Q. Which of the following is not a Javascript data type?",
        choices: ["String", "boolean", "object", "float"],
        answer: "float"
    },

    {
        question: "Q. What is the purpose of the this keyword in Javascript?",
        choices: [
            "It refers to the current function",
            "It refers to the current object",
            "It refers to the wrong way purpose"
        ],
        answer: "It refers to the current object"
    }
];

// Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;
let alertTimeout = null;

// Show questions
const showQuestions = () => {

    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;
    choicesBox.textContent = "";
    questionDetails.choices.forEach((choice) => {
        const choiceDiv = document.createElement('div');

        choiceDiv.textContent = choice;
        choiceDiv.classList.add('choice');

        choicesBox.appendChild(choiceDiv);
        choiceDiv.addEventListener('click', () => {

            document.querySelectorAll('.choice').forEach((item) => {
                item.classList.remove('selected');
            });

            choiceDiv.classList.add('selected');

        });

    });

    nextBtn.textContent = "Next";

    timeLeft = 15;
    timer.textContent = timeLeft;

    startTimer();
};

// Check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice) {
        displayAlert("Please select your answer!");
        return;
    }
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        score++;
        displayAlert("Correct Answer!");
    } else {
        displayAlert(
            `Wrong Answer! ${quiz[currentQuestionIndex].answer} is the correct answer.`
        );
    }
    currentQuestionIndex++;
    stopTimer();
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        showScore();
    }
};

// Show final score
const showScore = () => {
    stopTimer();
    questionBox.textContent = "";
    choicesBox.textContent = "";
    timer.textContent = "0";
    scoreCard.textContent = `You scored ${score} out of ${quiz.length}!`;
    nextBtn.textContent = "Play Again";
    quizOver = true;

};

// Display alert
const displayAlert = (msg) => {
    alertBox.style.display = "block";
    alertBox.textContent = msg;
    clearTimeout(alertTimeout);
    alertTimeout = setTimeout(() => {
        alertBox.style.display = "none";
    }, 2000);

};

// Start timer
const startTimer = () => {
    stopTimer();
    timer.textContent = timeLeft;
    timerID = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft <= 0) {
            stopTimer();
            displayAlert("Time is up!");
            currentQuestionIndex++;
            if (currentQuestionIndex < quiz.length) {
                setTimeout(() => {
                    showQuestions();
                }, 1000);
            } else {
                setTimeout(() => {
                    showScore();
                    askToPlayAgain();
                }, 1000);
            }
        }
    }, 1000);
};

// Stop timer
const stopTimer = () => {
    clearInterval(timerID);
};

// Ask to play again
const askToPlayAgain = () => {
    const confirmUser = confirm(
        "Quiz Completed! Do you want to play again?"
    );
    if (confirmUser) {
        startQuiz();
    } else {
        container.style.display = "none";
        startBtn.style.display = "block";
    }
};

// Start or restart quiz
const startQuiz = () => {
    stopTimer();
    currentQuestionIndex = 0;
    score = 0;
    quizOver = false;
    timeLeft = 15;
    scoreCard.textContent = "";
    alertBox.style.display = "none";
    showQuestions();
};

// Start button event
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

// Next button event
nextBtn.addEventListener('click', () => {
    if (quizOver) {
        askToPlayAgain();
    } else {
        checkAnswer();
    }
});
