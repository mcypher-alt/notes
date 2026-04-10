"use strict"
const openBtn = document.querySelector('#btn-add');
const doneBtn = document.querySelector('#done-btn');
const container = document.querySelector('.container');
const formContainer = document.querySelector('#form-container');
const noteName = document.querySelector('#note-name');
const noteDesc = document.querySelector('#note-description');
const resultDiv = document.querySelector('#result');

openBtn.addEventListener('click', () => {
    formContainer.classList.remove('hidden');
    openBtn.classList.add('hidden');
    resultDiv.textContent = '';
})

doneBtn.addEventListener('click', () => {
    formContainer.classList.add('hidden');
    openBtn.classList.remove('hidden');
    let noteValue = noteName.value.trim();
    let noteDescription = noteDesc.value.trim();
    let result = addNote(noteValue, noteDescription);
    resultDiv.textContent = result;
    noteName.value = '';
    noteDesc.value = '';
})

function getNotes() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

function addNote(nameValue, descriptionValue) {
    const notes = getNotes();
    if (nameValue !== '' && descriptionValue !== '') {
        const newNote = {
        id: Date.now(),      // уникальный ID (хеш по времени)
        title: nameValue,
        text: descriptionValue,
        createdAt: new Date().toISOString()
    };
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    return "Новая заметка добавлена!";
    }
    return "Поля ввода не могут быть пустыми!";
}