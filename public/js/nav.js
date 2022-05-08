'use strict';
// Code for sliding menu
// source: https://stackoverflow.com/questions/39670075/what-is-a-clean-way-to-toggle-a-slide-in-menu

const navSlide = () => {
    const toggleBtn = document.querySelector('.toggle-button');
    const navbarLinks = document.querySelector('.navbar-links');

    toggleBtn.addEventListener('click', () => {
        navbarLinks.classList.toggle('active')
    });
}

navSlide();