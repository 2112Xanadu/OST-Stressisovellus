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
        const i = measurements.length - 1;
        const html = `<h2>Sykevälivaihteludata</h2>
                <p style="text-align: center; margin-top: 2rem; ">
                Readiness: ${Math.round((measurements[i].result.readiness) * 100) / 100}<br>
                Mean_hr_bpm: ${Math.round((measurements[i].result.mean_hr_bpm) * 100) / 100}<br>
                PNS-index: ${Math.round((measurements[i].result.pns_index) * 100) / 100}<br>
        RMSSD(ms): ${Math.round((measurements[i].result.rmssd_ms) * 100) / 100}<br>
                Stress_index: ${Math.round((measurements[i].result.stress_index) * 100) / 100}</p>`;
        ul1.innerHTML = html;
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