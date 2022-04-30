'use strict';

// Fetching information to profile page
const url = 'http://localhost:3000'; // change url when uploading to server

// Displaying user's fullname
// select existing html elements
const h2First = document.getElementById('firstname');
const h2Last = document.getElementById('lastname');
const user = JSON.parse(sessionStorage.getItem('user'));
console.log(user);

h2First.innerHTML = user.firstname;
h2Last.innerHTML = user.lastname;

const inputFirstname = document.getElementById('etunimi');
inputFirstname.value = user.firstname;

const inputLastname = document.getElementById('sukunimi');
inputLastname.value = user.lastname;

const inputEmail = document.getElementById('email');
inputEmail.value = user.email;

const inputStudentid = document.getElementById('studentid');
inputStudentid.value = user.studentid;