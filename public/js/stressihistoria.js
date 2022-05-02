"use strict";

// Code for fetching information to homepage
const url = "http://localhost:3000"; // change url when uploading to server
const user = sessionStorage.getItem("user");
const userid = JSON.parse(user).userid;
const token = sessionStorage.getItem("token");
const pvm = new Date();
const date = pvm.getDate();
const month = pvm.getMonth();
const year = pvm.getFullYear();
const dateToDisplay = date + "." + (month + 1) + "." + year;

// Select element to display stress test result
const dailyStress = document.getElementById("ressi");

// Function for displaying stress test result
const printStress = (stress) => {
  console.log("toimiiko" + stress);
  if (stress.length > 0) {
    const html = `<h3>Stressidata</h3>
                    <p>
                    <b>Päivämäärä: </b> ${stress[
                      stress.length - 1
                    ].dateAndTime.substr(0, 10)}<br>
                    <b>Stressitasotestin tulos:</b> ${
                      stress[stress.length - 1].result
                    }<br>
                    <b>Omat muistiinpanot:</b> <br>${
                      stress[stress.length - 1].comment
                    }</p>`;
    dailyStress.innerHTML = html;
  }
};

// Function for fetching stress results
const getResult = async () => {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(url + "/stress/:userid", fetchOptions);
    const stress = await response.json();
    console.log(stress[0].dateAndTime.substr(0, 10));
    printStress(stress);
  } catch (e) {
    console.log(e.message);
  }
};
getResult();
