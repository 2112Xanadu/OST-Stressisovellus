"use strict";

const testButton = document.getElementById("aloita-testi");
const testDate = localStorage.getItem("testDate");
const aiemmat = document.getElementById("aiemmat-tulokset");

// Check if test has been done before starting test
testButton.onclick = () => {
  if (testDate) {
    window.location.assign("/stressitulokset.html");
  } else {
    window.location.assign("/testi.html");
  }
};

aiemmat.onclick = () => {
  window.location.assign("/stressihistoria.html");
};
