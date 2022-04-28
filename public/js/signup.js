'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const signUpForm = document.getElementById('register-form');

// submit add user form
signUpForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(signUpForm);
    console.log('rivi 10: ', data);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

    const response = await fetch(url + '/auth/register', fetchOptions); // /user
    const json = await response.json();
    alert(json.message);
    console.log('signUp.js line 22');
    location.href = 'index.html';
});
