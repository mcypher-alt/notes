"use strict"
const btn = document.querySelector('#btn-add');
const container = document.querySelector('.container');

btn.addEventListener('click', () => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('box');
    noteDiv.innerHTML = '<span>Новый <em>контент</em></span>';
    container.appendChild(noteDiv);
})