"use strict";

const pvm = new Date();
const date = pvm.getDate();
const month = pvm.getMonth();
const year = pvm.getFullYear();
document.getElementById("pvm1").innerHTML =
  date + "." + (month + 1) + "." + year;
document.getElementById("pvm2").innerHTML =
  date + "." + (month + 1) + "." + year;
