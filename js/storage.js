'use strict'

export function saveNote(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
};

export function getNotes() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
};

export function darkThemeStorage(themeClass) {
    if(themeClass.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    }
    else {
        localStorage.setItem('theme', 'light');
    }
};