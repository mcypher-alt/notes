"use strict"
import { escapeHtml } from "./safeHTML.js";
import { getNotes } from "./storage.js";
import { DIVS } from "./constants.js";

const noteList = DIVS.noteList;

function newNote(note) {
    noteList.insertAdjacentHTML('beforeend',`
    <div class='note'>
        <div class='hidden'>${note.id}</div>
        <button class='delete-btn'>Удалить</button>
        <button class='toggle-btn'>${escapeHtml(note.title)}</button>
            <div class='note-text'>
                <p>${escapeHtml(note.text)}</p>
            </div>
    </div>
    `);
};

export function noteListUpdate(newNotes) {
    noteList.innerHTML = '';
    if(newNotes.length !== 0) {
        for(let i = 0; i < newNotes.length; i++) {
            newNote(newNotes[i]);
        }
        return;
    }
    noteList.innerHTML = 'Ничего не найдено'
}

export function searchFunc(searchWord) {
    const notes = getNotes().filter((object) => object.title.toLowerCase().includes(searchWord.toLowerCase()));
    if(notes.length ===  0) return [];
    return notes;
}