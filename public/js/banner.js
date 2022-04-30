"use strict";

const pvm = new Date();
const date = pvm.getDate();
const month = pvm.getMonth();
const year = pvm.getFullYear();
const dateToDisplay = date + "." + (month + 1) + "." + year;

//Display the date in correct format
document.getElementById("pvm1").innerHTML = dateToDisplay;
document.getElementById("pvm2").innerHTML = dateToDisplay;
