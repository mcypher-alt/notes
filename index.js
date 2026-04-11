"use strict"
const openBtn1 = document.querySelector('#btn-add1');
const doneBtn = document.querySelector('#done-btn');
const container = document.querySelector('.container');
const formContainer = document.querySelector('#form-container');
const noteName = document.querySelector('#note-name');
const noteDesc = document.querySelector('#note-description');
const resultDiv = document.querySelector('#result');
const noteList = document.querySelector('.note-list');
noteListUpdate();

openBtn1.addEventListener('click', () => {
    formContainer.classList.remove('hidden');
    openBtn1.classList.add('hidden');
    resultDiv.textContent = '';
})

doneBtn.addEventListener('click', () => {
    formContainer.classList.add('hidden');
    openBtn1.classList.remove('hidden');
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
        const Note = {
        id: Date.now(),      // уникальный ID (хеш по времени)
        title: nameValue,
        text: descriptionValue,
        createdAt: new Date().toISOString()
    };
    notes.push(Note);
    newNote(Note);
    localStorage.setItem('notes', JSON.stringify(notes));
    return "Новая заметка добавлена!";
    }
    return "Поля ввода не могут быть пустыми!";
}

function noteListUpdate() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if(notes.length != 0) {
        for(let i = 0; i < notes.length; i++) {
            newNote(notes[i], i);
        }
    }
}

function newNote(note) {
    noteList.insertAdjacentHTML('beforeend',`
    <div class='note'>
        <div class='hidden'>${note.id}</div>
        <button class='delete-btn'>Удалить</button>
        <button class='toggle-btn'>${note.title}</button>
            <div class='note-text'>
                <p>${note.text}</p>
            </div>
    </div>
    `);
};

noteList.addEventListener('click', (event) => {
    const button = event.target;
    if (event.target.classList.contains('toggle-btn')) {
        // 4. Находим карточку, в которой лежит эта кнопка
        const note = button.closest('.note');
        // 5. Ищем скрытое меню ТОЛЬКО внутри этой найденной карточки
        const text = note.querySelector('.note-text');
        // 6. Переключаем класс видимости
        text.classList.toggle('open');
        }
    else if (event.target.classList.contains('delete-btn')) {
        const note = button.closest('.note');
        const idBlock = note.querySelector('.hidden');
        const noteId = idBlock.textContent.trim();
        if(confirm("Вы действительно хотите удалить эту заметку?")) {
            const notes = JSON.parse(localStorage.getItem('notes'));
            for(let i = 0; i < notes.length; i++) {
                if(notes[i].id == noteId) {
                    notes.splice(i, 1);
                    localStorage.setItem('notes', JSON.stringify(notes));
                    note.remove();
                    break;
                }
            }
        }
    }
});