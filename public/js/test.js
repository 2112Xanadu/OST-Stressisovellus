const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const testilaatikko = document.getElementById("testilaatikko");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
const SCORE_ANSWER1 = 0;
const SCORE_ANSWER2 = 1;
const SCORE_ANSWER3 = 2;
const MAX_QUESTIONS = 5;
let questions = [
  {
    question:
      "Onko sinulla ilmennyt uusia sairauksia tai kärsitkö muistivaikeuksista tai itkukohtauksista?",
    choice1: "Ei.",
    choice2: "Kyllä.",
    answer1: 1,
    answer2: 2,
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
    choice1: "Olen virkeä.",
    choice2: "Olen ärtynyt tai alakuloinen.",
    choice3: "Olen välinpitämätön tai masentunut.",
    answer1: 1,
    answer2: 2,
    answer3: 3,
  },
  {
    question: "Valitse itseäsi ja omaa tilannettasi parhaiten vastaava väite.",
    choice1: "Tunnen jaksavani hyvin.",
    choice2: "Tunnen itseni väsyneeksi.",
    choice3: "Olen uupunut ja voimavarani ovat poissa.",
    answer1: 1,
    answer2: 2,
    answer3: 3,
  },
];

startTest = () => {
  questionCounter = 0;
  getNewQuestion();
};

//This section needs comments
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    if (selectedAnswer == currentQuestion.answer1) {
      incrementScore(SCORE_ANSWER1);
    } else if (
      selectedAnswer == currentQuestion.answer3 ||
      (selectedAnswer == currentQuestion.answer2 &&
        questionCounter == MAX_QUESTIONS)
    ) {
      incrementScore(SCORE_ANSWER3);
    } else {
      incrementScore(SCORE_ANSWER2);
    }

    console.log(score);
    getNewQuestion();
  });
});

getNewQuestion = () => {
  if (questions.length === 0 || questionCounter == MAX_QUESTIONS) {
    //Save test score in session starage
    sessionStorage.setItem("mostRecentScore", score);

    ///Go to result page after last question
    return window.location.assign("/public/stressitulokset.html");
  }

  questionCounter++;
  questionCounterText.innerText =
    "Kysymys " + questionCounter + "/" + MAX_QUESTIONS;

  const questionIndex = questions.length - 1;
  currentQuestion = questions[questionIndex];
  question.innerText = currentQuestion.question;

  //Display answer options
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  //Show only answer with proper value
  const vika = document.getElementById("three");
  if (!currentQuestion.hasOwnProperty("choice3")) {
    vika.style.display = "none";
  } else {
    vika.style.display = "block";
  }

  questions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Increment score from each question
incrementScore = (num) => {
  score += num;
};

startTest();

//Automatically scroll to view specific element
testilaatikko.scrollIntoView(false);
