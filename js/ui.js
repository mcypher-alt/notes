"use strict"
import { escapeHtml } from "./safeHTML.js";
import { getNotes } from "./storage.js";

const noteList = document.querySelector('.note-list');

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

export function noteListUpdate() {
    const newNotes = getNotes();
    noteList.innerHTML = '';
    if(newNotes.length != 0) {
        for(let i = 0; i < newNotes.length; i++) {
            newNote(newNotes[i], i);
        }
    }
}