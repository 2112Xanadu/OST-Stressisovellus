"use strict";

// Code for fetching information to homepage
const url = "http://localhost:3000"; // change url when uploading to server

// Displaying user's firstname
// select existing html elements
const h2 = document.getElementById("display_name");
const user = JSON.parse(sessionStorage.getItem("user"));
const token = sessionStorage.getItem("token");
console.log(user);
h2.innerHTML = user.firstname;

// Hrv measurement
// select existing html elements
const ul1 = document.getElementById("checkHrv");

// This function prints measurement information from json file.
const printKubios = (measurements) => {
  console.log(measurements);

  if (measurements.length > 0) {
    const i = measurements.length - 1;
    const html = `<h2>HRV-data</h2>
                <p style="text-align: center; margin-top: 2rem; ">
                <b>Readiness:</b> ${
                  Math.round(measurements[i].result.readiness * 100) / 100
                }<br>
                <b>Mean_hr_bpm:</b> ${
                  Math.round(measurements[i].result.mean_hr_bpm * 100) / 100
                }<br>
                <b>PNS-index:</b> ${
                  Math.round(measurements[i].result.pns_index * 100) / 100
                }<br>
                <b>RMSSD(ms):</b> ${
                  Math.round(measurements[i].result.rmssd_ms * 100) / 100
                }<br>
        <b>Stress_index:</b> ${
          Math.round(measurements[i].result.stress_index * 100) / 100
        }</p>`;
    ul1.innerHTML = html;
  }
};

// Ajax call for fetching Hrv measurement information
const getKubios = async () => {
  try {
    const response = await fetch(url + "/kubios");
    const measurements = await response.json();
    printKubios(measurements);
  } catch (e) {
    console.log(e.message);
  }
};

// Starting Kubios function.
getKubios();

// Select element to display stress test result
const dailyStress = document.getElementById("checkStress");

// Function for displaying stress test result
const printStress = (stress) => {
  console.log("toimiiko" + stress);
  if (stress.length > 0) {
    const html = `<h2>Stressidata</h2>
                    <p>
                    <b>Stressitasotestin tulos:</b> ${
                      stress[stress.length - 1].result
                    }<br>
                    <b>Omat muistiinpanot:</b> ${
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
    printStress(stress);
  } catch (e) {
    console.log(e.message);
  }
};
getResult();
