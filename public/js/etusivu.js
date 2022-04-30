"use strict";

const stressi = document.getElementById("testaus");
const testiTehty = sessionStorage.getItem("testiTehty");

if (testiTehty) {
  stressi.innerText =
    "Testaajille huomioksi: valmiissa sovelluksessa tässä näkyy stressikyselyn tulos";
} else {
  stressi.innerText = "Tänään et ole vielä tehnyt stressitasotestiä.";
}
