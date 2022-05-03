"use strict";

const emoji = document.getElementById("emoji");
const result = document.getElementById("result");
const resultText = document.getElementById("resultText");
const laatikkoinen = document.getElementById("laatikkoinen");
const formi = document.getElementById("formi");
const tallenna = document.getElementById("tallenna");
const mostRecentScore = sessionStorage.getItem("mostRecentScore");
const testDate = localStorage.getItem("testDate");
const user = sessionStorage.getItem("user");
const userid = JSON.parse(user).userid;
const token = sessionStorage.getItem("token");
console.log(token);
const url = "http://localhost:3000";

//Display emoji, score and comment
result.innerText = `Pisteet: ${mostRecentScore}/10`;
if (mostRecentScore <= 2) {
  emoji.innerText = "😙";
  resultText.innerText = `Jatka samaan malliin! Mikäli kuitenkin koet stressitasosi nousevan, käynnistä stressin syiden etsiminen ja poistaminen sekä turvaa riittävä lepo ja palautuminen. Muista, että tämä testi on vain viitteellinen ja suuntaa antava.`;
} else if (mostRecentScore <= 4) {
  emoji.innerText = "😔";
  resultText.innerText = `Laita asiat tärkeysjärjestykseen, kaikkea et voi tehdä kerralla. Käynnistä stressin syiden etsiminen ja poistaminen sekä turvaa riittävä lepo ja palautuminen, sillä muutoin riskinä on se, että elimistö ei täysin palaudu normaalitilaan. Hyödynnä erilaisia rentoutumiskeinoja. Mikäli kuitenkin koet, että voimavarasi loppuvat hakeudu ammattiauttajan vastaanotolle. Muista, että tämä testi on vain viitteellinen ja suuntaa antava.`;
} else if (mostRecentScore > 4) {
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
  formi.style.display = "none";
  tallenna.style.display = "none";
  etusivulle.style.display = "block";
  localStorage.setItem("testDate", dateToDisplay);
};

//Check if the test has been done already.
//In a better world with more hours in a day, the date would come from the database.
if (testDate == dateToDisplay) {
  resultText.style.display = "none";
  result.innerText = "Olet tänään jo täyttänyt kyselyn.";
  emoji.style.display = "none";
  formi.style.display = "none";
  tallenna.style.display = "none";
  etusivulle.style.display = "block";
}

const aiemmat = document.getElementById("aiemmat");
aiemmat.onclick = () => {
  window.location.assign("/stressihistoria.html");
};

etusivulle.onclick = () => {
  window.location.assign("/home.html");
};
