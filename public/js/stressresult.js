"use strict";

const emoji = document.getElementById("emoji");
const result = document.getElementById("result");
const resultText = document.getElementById("resultText");
const laatikkoinen = document.getElementById("laatikkoinen");
const formi = document.getElementById("formi");
const scoreExplanation = document.getElementById("score-explanation");
const tallenna = document.getElementById("tallenna");
const mostRecentScore = sessionStorage.getItem("mostRecentScore");
const testDate = localStorage.getItem("testDate");
const user = sessionStorage.getItem("user");
const userid = JSON.parse(user).userid;
const token = sessionStorage.getItem("token");
const aiemmat = document.getElementById("aiemmat");
const url = "http://localhost:3000";

//Display emoji, score and comment
result.innerText = `Pisteet: ${mostRecentScore}/10`;
if (mostRecentScore <= 3) {
  emoji.innerText = "😙";
  resultText.innerText = `Jatka samaan malliin! Mikäli kuitenkin koet stressitasosi nousevan, käynnistä stressin syiden etsiminen ja poistaminen sekä turvaa riittävä lepo ja palautuminen. Muista, että tämä testi on vain viitteellinen ja suuntaa antava.`;
} else if (mostRecentScore <= 6) {
  emoji.innerText = "😬";
  resultText.innerText = `Laita asiat tärkeysjärjestykseen, kaikkea et voi tehdä kerralla. Käynnistä stressin syiden etsiminen ja poistaminen sekä turvaa riittävä lepo ja palautuminen, sillä muutoin riskinä on se, että elimistö ei täysin palaudu normaalitilaan. Hyödynnä erilaisia rentoutumiskeinoja. Mikäli kuitenkin koet, että voimavarasi loppuvat, hakeudu ammattiauttajan vastaanotolle. Muista, että tämä testi on vain viitteellinen ja suuntaa antava.`;
} else if (mostRecentScore > 6) {
  emoji.innerText = "🤯";
  resultText.innerText = `Hakeudu ammattiauttajan vastaanotolle. Tilanne vaatii elämän kokonaisvaltaista uudelleen arviointia. Muista, että tämä testi on vain viitteellinen ja suuntaa antava.`;
}

//Automatically scroll to view  element
laatikkoinen.scrollIntoView(true);

//Save results to database when button is clicked
tallenna.onclick = () => {
  const stressResult = mostRecentScore;
  const kommentti = document.getElementById("textArea");
  const comment = kommentti.value;

  fetch("/stress", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      result: stressResult,
      comment,
      userid,
    }),
  });

  //Hide button
  const etusivulle = document.getElementById("etusivulle");
  etusivulle.style.display = "none";

  //Change html elements after click
  resultText.style.display = "none";
  result.innerText = "Kiitos vastauksesta!";
  emoji.style.display = "none";
  scoreExplanation.style.display = "none";
  formi.style.display = "none";
  tallenna.style.display = "none";
  etusivulle.style.display = "block";
  localStorage.setItem("testDate", dateToDisplay);
};

//Check if the test has been done already.
//In a better world with more time, the date would come from the database.
if (testDate == dateToDisplay) {
  resultText.style.display = "none";
  result.innerText = "Olet tänään jo täyttänyt kyselyn.";
  emoji.style.display = "none";
  scoreExplanation.style.display = "none";
  formi.style.display = "none";
  tallenna.style.display = "none";
  etusivulle.style.display = "block";
}

//Go to stressihistoria.html when clicked
aiemmat.onclick = () => {
  window.location.assign("/stressihistoria.html");
};
//Go to front page when clicked
etusivulle.onclick = () => {
  window.location.assign("/home.html");
};
