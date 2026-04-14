"use strict"

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const circle = document.querySelector('.transition');
    if (circle) circle.classList.add('is-active');
}