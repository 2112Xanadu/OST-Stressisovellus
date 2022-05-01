"use strict";

const testButton = document.getElementById("aloita-testi");
const testiTehty = sessionStorage.getItem("testiTehty");
const aiemmat = document.getElementById("aiemmat-tulokset");

testButton.onclick = () => {
  if (testiTehty) {
    window.location.assign("/stressitulokset.html");
  } else {
    window.location.assign("/testi.html");
  }
};

aiemmat.onclick = () => {
  window.location.assign("/stressihistoria.html");
};
