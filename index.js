"use strict"
import { noteListUpdate } from "./js/ui.js";
import { saveNote, getNotes } from "./js/storage.js";

const openBtn1 = document.querySelector('#btn-add1');
const doneBtn = document.querySelector('#done-btn');
const formContainer = document.querySelector('#form-container');
const noteName = document.querySelector('#note-name');
const noteDesc = document.querySelector('#note-description');
const resultDiv = document.querySelector('#result');
const noteList = document.querySelector('.note-list');
const backBtn = document.querySelector('#back-btn');

function addNote(nameValue, descriptionValue) {
    if (nameValue === '' || descriptionValue === '') {
        return "Поля ввода не могут быть пустыми!";
    }
    const notes = getNotes();
    const newNote = {
        id: Date.now(),
        title: nameValue,
        text: descriptionValue,
        createdAt: new Date().toISOString()
    };
    notes.push(newNote);
    saveNote(notes);
    noteListUpdate();  // ✅ обновляем UI
    return "Новая заметка добавлена!";
}

noteListUpdate();

openBtn1.addEventListener('click', () => {
    formContainer.classList.remove('hidden');
    openBtn1.classList.add('hidden');
    resultDiv.textContent = '';
})

doneBtn.addEventListener('click', () => {
    let noteValue = noteName.value.trim();
    let noteDescription = noteDesc.value.trim();

    if(noteValue === '' || noteDescription === '') {
        resultDiv.textContent = 'Поля ввода не могут быть пустыми!';
        return;
    };
    noteName.value = '';
    noteDesc.value = '';
    const result = addNote(noteValue, noteDescription);
    resultDiv.textContent = result;
});

backBtn.addEventListener('click', () => {
    formContainer.classList.add('hidden');
    openBtn1.classList.remove('hidden');
    noteName.value = '';
    noteDesc.value = '';
});

noteList.addEventListener('click', (event) => {
    const button = event.target;
    if (button.classList.contains('toggle-btn')) {
        // 4. Находим карточку, в которой лежит эта кнопка
        const note = button.closest('.note');
        // 5. Ищем скрытое меню ТОЛЬКО внутри этой найденной карточки
        const text = note.querySelector('.note-text');
        // 6. Переключаем класс видимости
        text.classList.toggle('open');
        }
    else if (button.classList.contains('delete-btn')) {
        const note = button.closest('.note');
        const idBlock = note.querySelector('.hidden');
        const noteId = idBlock.textContent.trim();
        if(confirm("Вы действительно хотите удалить эту заметку?")) {
            const notes = getNotes();
            for(let i = 0; i < notes.length; i++) {
                if(notes[i].id == noteId) {
                    notes.splice(i, 1);
                    saveNote(notes);
                    note.remove();
                    break;
                }
            }
        }
    }
});