const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;

let availableQuestions = [];
let questions = [
  {
    question: "Valitse itseäsi ja omaa tilannettasi parhaiten vastaava väite.",
    choice1: "Tunnen jaksavani hyvin.",
    choice2: "Tunnen itseni väsyneeksi.",
    choice3: "Olen uupunut ja voimavarani ovat poissa.",
    answer1: 1,
    answer2: 2,
    answer3: 3,
  },
  {
    question: "Valitse itseäsi ja omaa tilannettasi parhaiten vastaava väite.",
    choice1: "Olen virkeä.",
    choice2: "Olen ärtynyt tai alakuloinen.",
    choice3: "Olen välinpitämätön tai masentunut.",
    answer1: 1,
    answer2: 2,
    answer3: 3,
  },
  {
    question: "Valitse itseäsi ja omaa tilannettasi parhaiten vastaava väite.",
    choice1: "Vapaa-aikani riittää palautumiseen.",
    choice2: "En koe palautuvani ihan täysin.",
    choice3:
      "Vapaa-aikani ei riitä palautumiseen tai tunnen itseni loppuun palaneeksi.",
    answer1: 1,
    answer2: 2,
    answer3: 3,
  },
  {
    question: "Valitse itseäsi ja omaa tilannettasi parhaiten vastaava väite.",
    choice1: "Minulla on pieni määrä stressiä, joka pitää minut toimeliaana.",
    choice2: "Minun on vaikea keskittyä meneillään oleviin projekteihin.",
    choice3:
      "Haluni yrittää selviytyä meneillään olevista tehtävistä ja velvollisuuksista on vähentynyt tai olen miettinyt luovuttamista.",
    answer1: 1,
    answer2: 2,
    answer3: 3,
  },
  {
    question:
      "Onko sinulla ilmennyt uusia sairauksia tai kärsitkö muistivaikeuksista tai itkukohtauksista?",
    choice1: "Kyllä.",
    choice2: "Ei.",
    answer1: 1,
    answer2: 2,
    answer3: 4,
  },
];

//Constants

const SCORE_ANSWER1 = 0;
const SCORE_ANSWER2 = 1;
const SCORE_ANSWER3 = 2;
const MAX_QUESTIONS = 5;

startTest = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  //   console.log(availableQuestions);

  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    ///Go to /end.html
    return window.location.assign("/testi.html");
  }
  questionCounter++;
  questionCounterText.innerText =
    "Kysymys " + questionCounter + "/" + MAX_QUESTIONS;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    // console.log(choice);
  });
  const vika = document.getElementById("three");
  if (!currentQuestion.hasOwnProperty("choice3")) {
    vika.style.display = "none";
  } else {
    vika.style.display = "block";
  }

  availableQuestions.splice(questionIndex, 1);
  //   console.log(availableQuestions);
  acceptingAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    // console.log(selectedAnswer);
    // console.log(currentQuestion.answer1);

    // const classToApply =
    //   selectedAnswer == currentQuestion.answer1 ? "correct" : "incorrect";
    // console.log(classToApply);

    // if (classToApply === "correct") {
    //   incrementScore(CORRECT_BONUS);
    // }
    if (selectedAnswer == currentQuestion.answer1) {
      incrementScore(SCORE_ANSWER1);
    } else if (selectedAnswer == currentQuestion.answer2) {
      incrementScore(SCORE_ANSWER2);
    } else {
      incrementScore(SCORE_ANSWER3);
    }
    console.log(score);

    getNewQuestion();
  });
});

incrementScore = (num) => {
  score += num;
};

startTest();
