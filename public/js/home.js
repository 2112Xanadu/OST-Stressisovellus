'use strict';

// Code for fetching information to homepage
const url = 'http://localhost:3000'; // change url when uploading to server

// Displays user's firstname
const h2 = document.getElementById("display_name");
const user = JSON.parse(sessionStorage.getItem('user'));
console.log(user);
h2.innerHTML = user.firstname;

// select existing html elements
const ul1 = document.getElementById('hrv-data');
const ul2 = document.getElementById('stress_results');

// Create Kubios card
const printKubios = (measurements) => {

    console.log(measurements);
    if (measurements.length > 0) {
        const html = `<h2>HRV-data</h2>

                  Readiness: ${measurements.result.readiness}
                  Mean_hr_bpm: 55
                  PNS-index: 44
                  RMSSD (ms): 992
                  Stress_index: 0,594`;
        document.getElementById('hrv-data').innerHTML = html;
    }
}

// Create Stress Survey card


// AJAX call for fetching data from Kubios
const getKubios = async () => {
    try {
        const response = await fetch(url + '/kubios');
        const measurements = await response.json();
        printKubios(measurements);
    } catch (e) {
        console.log(e.message);
    }
};

// Ajax call for fetching stress survey information from database


//getKubios();
//getSurvey();