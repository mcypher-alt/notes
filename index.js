"use strict"
import { noteListUpdate, searchFunc } from "./js/ui.js";
import { saveNote, getNotes, darkThemeStorage } from "./js/storage.js";
import { BUTTONS, DIVS } from "./js/constants.js";


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
    noteListUpdate(getNotes());  // ✅ обновляем UI
    return "Новая заметка добавлена!";
}

noteListUpdate(getNotes());

BUTTONS.themeBtn.addEventListener('click', () => {
    const circle = document.querySelector('.transition');
    circle.classList.toggle('is-active');
    const body = document.body.classList;
    body.toggle('dark-theme');
    darkThemeStorage(body);
});

BUTTONS.inputField.addEventListener('input', (event) => {
    const currentText = event.target.value;
    noteListUpdate(searchFunc(currentText));
})

BUTTONS.openBtn.addEventListener('click', () => {
    DIVS.formContainer.classList.remove('hidden');
    BUTTONS.openBtn.classList.add('hidden');
    DIVS.result.textContent = '';
})

BUTTONS.doneBtn.addEventListener('click', () => {
    let noteValue = DIVS.noteName.value.trim();
    let noteDescription = DIVS.noteDesc.value.trim();

    if(noteValue === '' || noteDescription === '') {
        DIVS.result.textContent = 'Поля ввода не могут быть пустыми!';
        return;
    };
    DIVS.noteName.value = '';
    DIVS.noteDesc.value = '';
    const result = addNote(noteValue, noteDescription);
    DIVS.result.textContent = result;
    BUTTONS.inputField.value = '';
    BUTTONS.inputField.focus();
});

BUTTONS.backBtn.addEventListener('click', () => {
    DIVS.formContainer.classList.add('hidden');
    BUTTONS.openBtn.classList.remove('hidden');
    DIVS.noteName.value = '';
    DIVS.noteDesc.value = '';
});

DIVS.noteList.addEventListener('click', (event) => {
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