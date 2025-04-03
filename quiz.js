const easyQuestions = [
    { question: "2 + 2 =", answers: ["3", "4", "5", "6"], correct: "4" },
    { question: "5 - 3 =", answers: ["1", "2", "3", "4"], correct: "2" },
];

const mediumQuestions = [
    { question: "12 ÷ 3 =", answers: ["3", "4", "5", "6"], correct: "4" },
    { question: "7 × 3 =", answers: ["19", "20", "21", "22"], correct: "21" },
];

const hardQuestions = [
    { question: "18 ÷ 2 × 3 =", answers: ["18", "27", "36", "54"], correct: "27" },
    { question: "15 × 4 - 10 =", answers: ["40", "50", "55", "60"], correct: "50" },
];

//dont modify code below this line
const userName = localStorage.getItem("quizUser") || "Player";
const level = localStorage.getItem("quizLevel") || "easy";
document.getElementById("user-name").textContent = `Name: ${userName}`;

const questions = level === "easy" ? easyQuestions :
                 level === "medium" ? mediumQuestions :
                 hardQuestions;

let currentQuestion = 0;
let score = 0;
let timer = 30;
const timerElement = document.getElementById("timer");

function startQuiz() {
    loadQuestion();
    setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer === 0) nextQuestion();
    }, 1000);
}

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("question-text").textContent = question.question;
    const answersContainer = document.getElementById("answer-buttons");
    answersContainer.innerHTML = "";

    question.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.classList.add("btn-3d", "bg-white", "text-black", "border", "border-gray-400", "p-3", "rounded-lg", "transition", "duration-300");
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(answer, btn);
        answersContainer.appendChild(btn);
    });
}

function checkAnswer(answer, selectedButton) {
    const answerButtons = document.getElementById("answer-buttons").children;
    const correctAnswer = questions[currentQuestion].correct;

    // Reset all buttons before applying correct/incorrect styles
    Array.from(answerButtons).forEach(button => {
        button.classList.remove("bg-green-500", "bg-red-500", "border-green-600", "border-red-600", "opacity-50", "border-50"); // Remove existing styles
        button.disabled = true; // Disable all buttons after selection
    });

    // Add visual feedback for the selected button
    if (answer === correctAnswer) {
        selectedButton.classList.add("bg-green-500", "border-green-600", "border-50"); // Green for correct
        score++;
    } else {
        selectedButton.classList.add("bg-red-500", "border-red-600", "border-50"); // Red for incorrect
        // Find and highlight the correct answer
        Array.from(answerButtons).forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add("bg-green-500", "border-green-600"); // Green for correct answer
            }
        });
    }

    // Wait 1 second before transitioning to the next question
    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        localStorage.setItem("quizScore", score);
        window.location.href = "results.html";
    }
}

startQuiz();
