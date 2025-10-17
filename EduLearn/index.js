const quizData = {
  html: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Learning",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language",
      ],
      answer: 0,
    },
    {
      question: "Which tag is used for inserting an image?",
      options: ["<img>", "<image>", "<pic>", "<src>"],
      answer: 0,
    },
  ],
  css: [
    {
      question: "Which property changes the text color?",
      options: ["font-style", "text-color", "color", "background"],
      answer: 2,
    },
    {
      question: "Which CSS property controls spacing between lines?",
      options: ["margin", "padding", "line-height", "border"],
      answer: 2,
    },
  ],
  js: [
    {
      question: "Which keyword declares a variable?",
      options: ["var", "let", "const", "All of these"],
      answer: 3,
    },
    {
      question: "What is the output of 2 + '2' in JS?",
      options: ["4", "22", "NaN", "Error"],
      answer: 1,
    },
  ],
};

let currentTopic = "";
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;
let userAnswers = [];

function startQuiz(topic) {
  currentTopic = topic;
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  document.getElementById("topics").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("quiz-title").textContent =
    topic.toUpperCase() + " Quiz";
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const questionObj = quizData[currentTopic][currentQuestion];
  document.getElementById("question").textContent = questionObj.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  questionObj.options.forEach((opt, index) => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(index);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(index) {
  const questionObj = quizData[currentTopic][currentQuestion];
  const options = document.querySelectorAll(".option");

  options.forEach((btn) => (btn.onclick = null)); // disable clicking after selection
  userAnswers.push(index);

  if (index === questionObj.answer) {
    options[index].classList.add("correct");
    score++;
  } else {
    options[index].classList.add("wrong");
    options[questionObj.answer].classList.add("correct");
  }

  clearInterval(timer);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData[currentTopic].length) {
    loadQuestion();
    resetTimer();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timeLeft = 15;
  document.getElementById("time").textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

function endQuiz() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").textContent = /*${score} / ${quizData[*/currentTopic/*].length}*/;
}

function reviewAnswers() {
  const reviewDiv = document.getElementById("review");
  reviewDiv.classList.toggle("hidden");
  reviewDiv.innerHTML = "<h3>Review Answers:</h3>";
  quizData[currentTopic].forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Q${i + 1}:</strong> ${q.question}</p>
      <p>Your Answer: ${q.options[userAnswers[i]] || "Not answered"}</p>
      <p>Correct Answer: ${q.options[q.answer]}</p><hr>
    `;
    reviewDiv.appendChild(div);
  });
}

function goHome() {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("topics").classList.remove("hidden");
}