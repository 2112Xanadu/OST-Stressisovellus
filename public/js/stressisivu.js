"use strict";

const testButton = document.getElementById("aloita-testi");
const testDate = localStorage.getItem("testDate");
const aiemmat = document.getElementById("aiemmat-tulokset");

const dateCheck = new Date();
const dayCheck = dateCheck.getDate();
const monthCheck = dateCheck.getMonth();
const yearCheck = dateCheck.getFullYear();
const dateFormat = dayCheck + "." + (monthCheck + 1) + "." + yearCheck;

// Check if test has been done on same day before starting test
testButton.onclick = () => {
  if (testDate == dateToDisplay) {
    window.location.assign("/stressitulokset.html");
  } else {
    window.location.assign("/testi.html");
  }
};

aiemmat.onclick = () => {
  window.location.assign("/stressihistoria.html");
};
