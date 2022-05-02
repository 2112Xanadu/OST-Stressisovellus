"use strict";

const emoji = document.getElementById("emoji");
const result = document.getElementById("result");
const resultText = document.getElementById("resultText");
const laatikkoinen = document.getElementById("laatikkoinen");
const formi = document.getElementById("formi");
const mostRecentScore = sessionStorage.getItem("mostRecentScore");
const testiTehty = sessionStorage.getItem("testiTehty");
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

const tallenna = document.getElementById("tallenna");
const etusivulle = document.getElementById("etusivulle");
etusivulle.style.display = "none";

//Automatically scroll to view specific element

laatikkoinen.scrollIntoView(true);

//Save results to database
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

  //Change html elements after click
  resultText.style.display = "none";
  result.innerText = "Kiitos vastauksesta!";
  emoji.style.display = "none";
  formi.style.display = "none";
  tallenna.style.display = "none";
  etusivulle.style.display = "block";
  sessionStorage.setItem("testiTehty", testiTehty);
};
const getResult = async () => {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(url + "/", fetchOptions);
    const rslts = await response.json();
    console.log("All stress results: ", rslts);
    return rslts;
  } catch (e) {}
};

getResult();

//Check if the test has been done already. This functionality will be implemented differently.
// if (testiTehty) {
//   resultText.style.display = "none";
//   result.innerText = "Olet tänään jo täyttänyt kyselyn.";
//   emoji.style.display = "none";
//   formi.style.display = "none";
//   tallenna.style.display = "none";
//   etusivulle.style.display = "block";
// }

etusivulle.onclick = () => {
  window.location.assign("/home.html");
};

const aiemmat = document.getElementById("aiemmat");
aiemmat.onclick = () => {
  window.location.assign("/stressihistoria.html");
};
