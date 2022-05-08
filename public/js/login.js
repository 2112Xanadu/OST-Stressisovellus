'use strict';

// source: https://github.com/patrick-ausderau/wop

const url = 'http://localhost:3000';

// Select existing html elements
const loginForm = document.getElementById('login-form');

console.log('login form?', loginForm);

// Login
loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(loginForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url + '/auth/login', fetchOptions);
    const json = await response.json();
    console.log('login response', json);
    if (!json.user) {
        alert(json.message);
    } else {
        // Saves token
        sessionStorage.setItem('token', json.token);
        sessionStorage.setItem('user', JSON.stringify(json.user));
        alert('Sisäänkirjautuminen onnistui');
        location.href = 'home.html';
    }
});
