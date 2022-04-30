"use strict";

const testButton = document.getElementById("aloita-testi");
const testiTehty = sessionStorage.getItem("testiTehty");

testButton.onclick = () => {
  if (testiTehty) {
    window.location.assign("/public/stressitulokset.html");
  } else {
    window.location.assign("/public/testi.html");
  }
};
