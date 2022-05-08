'use strict';
// Source: https://github.com/patrick-ausderau/wop
// Code for logging out
const url = 'http://localhost:3000';

(async () => {
  try {
    const response = await fetch(url + '/auth/logout');
    const json = await response.json();
    console.log(json);
    // remove token
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    alert('Olet ulos kirjautuneena');
    location.href = 'index.html';
  } catch (e) {
    console.log(e.message);
  }
})();
