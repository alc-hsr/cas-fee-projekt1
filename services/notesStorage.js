'use strict';

const moment = require('moment');

class Note {
    constructor() {
        this.id = undefined;
        this.title = undefined;
        this.description = undefined;
        this.importance = 0;
        this.creationDate = moment().format('YYYY-MM-DD');
        this.dueDate = undefined;
        this.finishedDate = undefined;
    }

    static of(theNote) {
        let note = new Note();
        note.mergeNote(theNote);
        return note;
    }

    mergeNote(theNote) {
        this.id = (theNote.id) ? parseInt(theNote.id) : undefined;
        this.title = theNote.title;
        this.description = theNote.description;
        this.importance = (theNote.importance) ? parseInt(theNote.importance) : 0;
        this.creationDate = (theNote.creationDate) ? theNote.creationDate : moment().format('YYYY-MM-DD');
        this.dueDate = theNote.dueDate;
        this.finishedDate = theNote.finishedDate;
    }
}

class NoteCounter {
    constructor() {
        this.countAll = 0;
        this.countFinished = 0;
        this.countDisplaying = 0;
    }
}

module.exports = (function() {

    let noteDatabase = JSON.stringify({
        notes: []
        /*notes: [
            {id: 1, title: 'Erste Notiz', description: 'Beschreibung der ersten Notiz', importance: 1, creationDate: '2001-01-01', dueDate: '2032-12-12', finishedDate: '2017-05-09'},
            {id: 2, title: 'Zweite Notiz', description: 'Beschreibung der zweiten Notiz', importance: 2, creationDate: '2002-02-02', dueDate: '2031-11-11'},
            {id: 3, title: 'Dritte Notiz', description: 'Beschreibung der dritten Notiz', importance: 3, creationDate: '2003-03-03', dueDate: '2030-10-10'},
            {id: 4, title: 'Vierte Notiz', description: 'Beschreibung der vierten Notiz', importance: 4, creationDate: '2004-04-04', dueDate: '2029-09-09', finishedDate: '2017-05-08'},
            {id: 5, title: 'Fünfte Notiz', description: 'Beschreibung der fünften Notiz', importance: 5, creationDate: '2005-05-05', dueDate: '2028-08-08'},
            {id: 6, title: 'Sechste Notiz', description: 'Beschreibung der sechsten Notiz', importance: 0, creationDate: '2006-06-06', dueDate: '2027-07-07'},
            {id: 7, title: 'Siebte Notiz', description: 'Beschreibung der siebten Notiz', importance: 0, creationDate: '2007-07-07', dueDate: '2026-06-06', finishedDate: '2017-05-15'},
            {id: 8, title: 'Achte Notiz', description: 'Beschreibung der achten Notiz', importance: 1, creationDate: '2008-08-08', dueDate: '2025-05-05'},
            {id: 9, title: 'Neunte Notiz', description: 'Beschreibung der neunten Notiz', importance: 0, creationDate: '2009-09-09', dueDate: '2024-04-04'},
            {id: 10, title: 'Zehnte Notiz', description: 'Beschreibung der zehnten Notiz', importance: 0, creationDate: '2010-10-10', dueDate: '2023-03-03', finishedDate: '2017-05-01'},
            {id: 11, title: 'Elfte Notiz', description: 'Beschreibung der elften Notiz', importance: 0, creationDate: '2011-11-11', dueDate: '2022-02-02'},
            {id: 12, title: 'Zwölfte Notiz', description: 'Beschreibung der zwölften Notiz', importance: 0, creationDate: '2012-12-12', dueDate: '2021-01-01'}
        ]*/
    });

    function getAllNotesFromStorage() {
        return JSON.parse(noteDatabase).notes.map(note => Note.of(note));
    }

    function saveNotesToStorage(theNotes) {
        noteDatabase = JSON.stringify({
            notes: theNotes
        });
    }

    function getNextNoteId(theNotes) {
        let maxId = Math.max(... theNotes.map(note => note.id));
        return isFinite(maxId) ? (maxId + 1) : 1;
    }

    function getNoteCounter() {
        let noteCounter = new NoteCounter();
        for (let note of getAllNotesFromStorage()) {
            noteCounter.countAll++;
            if (note.finishedDate) {
                noteCounter.countFinished++;
            }
        }
        return noteCounter;
    }

    function getNotes(theLoadFinished) {
        let filteredNotes = filterNotes(getAllNotesFromStorage(), theLoadFinished);
        let noteCounter = getNoteCounter();
        noteCounter.countDisplaying = filteredNotes.length;
        return {
            notes: filteredNotes,
            noteCounter: noteCounter
        };
    }

    function filterNotes(theNotes, theLoadFinished) {
        return theNotes.filter((note) => theLoadFinished || !note.finishedDate);
    }

    function getNote(theNoteId) {
        theNoteId = parseInt(theNoteId);
        for (let note of getAllNotesFromStorage()) {
            if (note.id === theNoteId) {
                return note;
            }
        }
        return undefined;
    }

    function saveNote(theNote) {
        const INVALID_DUEDATE_ERROR_CODE = 'invalid-duedate';
        if (theNote.dueDate) {
            if (!new RegExp('^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$').test(theNote.dueDate)) {
                return INVALID_DUEDATE_ERROR_CODE;
            }
            else if (!moment(theNote.dueDate).isValid()) {
                return INVALID_DUEDATE_ERROR_CODE;
            }
        }

        let notes = getAllNotesFromStorage();
        if (theNote.id) {
            for (let note of notes) {
                if (note.id === theNote.id) {
                    note.mergeNote(theNote);
                    saveNotesToStorage(notes);
                    break;
                }
            }
        }
        else {
            theNote.id = getNextNoteId(notes);
            notes.push(theNote);
            saveNotesToStorage(notes);
        }

        return undefined;
    }

    function deleteNote(theNoteId) {
        theNoteId = parseInt(theNoteId);
        let notes = getAllNotesFromStorage();
        for (let index = 0; index < notes.length; index++) {
            if (notes[index].id === theNoteId) {
                notes.splice(index, 1);
                saveNotesToStorage(notes);
                break;
            }
        }
    }

    return {
        getNotes,
        getNote,
        saveNote,
        deleteNote
    };
})();
