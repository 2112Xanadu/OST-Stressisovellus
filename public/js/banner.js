"use strict";

const pvm = new Date();
const date = pvm.getDate();
const month = pvm.getMonth();
const year = pvm.getFullYear();

//Variable containing current date in a beautiful form
const dateToDisplay = date + "." + (month + 1) + "." + year;

//Display the date
document.getElementById("pvm1").innerHTML = dateToDisplay;
document.getElementById("pvm2").innerHTML = dateToDisplay;
