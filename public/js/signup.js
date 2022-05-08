'use strict';
// Source: https://github.com/patrick-ausderau/wop
const url = 'http://localhost:3000';

// select existing html elements
const signUpForm = document.getElementById('register-form');

// Submitting register form
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
    //console.log('signUp.js line 22');
    location.href = 'index.html';
});
