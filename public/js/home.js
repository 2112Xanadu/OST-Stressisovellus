
'use strict';

// Code for fetching information to homepage
const url = 'http://localhost:3000'; // change url when uploading to server

// Displaying user's firstname
// select existing html elements
const h2 = document.getElementById("display_name");
const user = JSON.parse(sessionStorage.getItem('user'));
console.log(user);
h2.innerHTML = user.firstname;


// Hrv measurement
// select existing html elements
const ul1 = document.getElementById('checkHrv');

// This function prints measurement information from json file.
const printKubios = (measurements) => {

    console.log(measurements);

    if (measurements.length > 0) {
        const i = measurements.length - 1;
        const html = `<a href='info.html' id='infolink' style="text-align: rigth;" title="Lisätietoa HRV-arvoista" ><i class="bi bi-question-circle fa-lg" style="text-align: rigth;"></i></a><br>
        <h2>HRV-data</h2>
                <p style="text-align: center; margin-top: 0.5rem; ">
                Readiness: ${Math.round((measurements[i].result.readiness) * 100) / 100}<br>
                Mean_hr_bpm: ${Math.round((measurements[i].result.mean_hr_bpm) * 100) / 100}<br>
                PNS-index: ${Math.round((measurements[i].result.pns_index) * 100) / 100}<br>
        RMSSD(ms): ${Math.round((measurements[i].result.rmssd_ms) * 100) / 100}<br>
                Stress_index: ${Math.round((measurements[i].result.stress_index) * 100) / 100}</p>
                `;
        ul1.innerHTML = html;
    }
}

// Stress survey
// select existing html elements
//const ul2 = document.getElementById('stress survey info');


// Ajax call for fetching Hrv measurement information
const getKubios = async () => {
    try {
        const response = await fetch(url + '/kubios');
        const measurements = await response.json();
        printKubios(measurements);
    } catch (e) {
        console.log(e.message);
    }
};

// Starting Kubios function.
getKubios();