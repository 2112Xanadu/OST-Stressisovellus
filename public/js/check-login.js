(async () => {
  'use strict';

  // Source: https://github.com/patrick-ausderau/wop
  // Code for checking if user is logged in
  const url = 'http://localhost:3000';

  // Checks sessionStorage
  if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
    location.href = 'index.html';
    return;
  }
  // Checks if token is valid
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user/token', fetchOptions);
    if (!response.ok) {
      location.href = 'logout.html';
    } else {
      const json = await response.json();
      sessionStorage.setItem('user', JSON.stringify(json.user));
    }
  } catch (e) {
    console.log(e.message);
  }
})();
