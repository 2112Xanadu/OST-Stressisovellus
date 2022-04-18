'use strict';

const url = 'http://localhost:3000'; // change url when uploading to server



// select existing html elements
const ul1 = document.getElementById('hrv-results');
const ul2 = document.getElementById('stress_results');

// create kubios card


// create area



// AJAX call
const getCat = async () => {
    try {
        const response = await fetch(url + '/user');
        const user = await response.json();
        createKubiosCard(user);
    } catch (e) {
        console.log(e.message);
    }
};
getCat();