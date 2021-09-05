const startButton = document.getElementById("start");
const nextButton = document.getElementById("next");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btns");
let shufflesQuestions, currentQuestionIndex;
let score=0
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
function startQuiz() {
  console.log("started");
  score=0
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  shufflesQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();

  showQuestion(shufflesQuestions[currentQuestionIndex]);
}

function resetState() {
  clearStatus(document.body)
  nextButton.classList.add("hide");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showQuestion(question) {
  questionElement.innerText =(currentQuestionIndex+1)+'. '+ question.question;
  question.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatus(element);
  if (correct) {
      element.classList.add("correct");
      
    } else {
    element.classList.add("wrong");
    
  }
}

function clearStatus(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}



const questions = [
  {
    question: "What is 1 +  1 ?",
    answer: [
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "5", correct: false },
    ],
  },

  {
    question: "What is 2 +  2 ?",
    answer: [
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
    ],
  },
  {
    question: "What is 1 +  2 ?",
    answer: [
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
      { text: "5", correct: false },
    ],
  },
];
