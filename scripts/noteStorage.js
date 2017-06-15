'use strict';

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
        return Object.assign(this, theNote);
    }
}

class NoteCounter {
    constructor() {
        this.countAll = 0;
        this.countFinished = 0;
        this.countDisplaying = 0;
    }
}

let noteModule = (function() {

    const NOTES_PROPERTY = 'notes';

    function getAllNotesFromStorage() {
        let notes = localStorage.getItem(NOTES_PROPERTY);
        if (!notes) {
            localStorage.setItem(NOTES_PROPERTY, JSON.stringify([]));
            notes = localStorage.getItem(NOTES_PROPERTY);
        }
        return JSON.parse(notes).map(note => Note.of(note));
    }

    function saveNotesToStorage(theNotes) {
        localStorage.setItem(NOTES_PROPERTY, JSON.stringify(theNotes));
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
        return filterNotes(getAllNotesFromStorage(), theLoadFinished);
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

    function saveNote(theNote) {
        if (theNote.dueDate && !moment(theNote.dueDate).isValid()) {
            return false;
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

        return true;
    }

    function finishNote(theNoteId, theAlreadyFinished) {
        theNoteId = parseInt(theNoteId);
        let notes = getAllNotesFromStorage();
        for (let note of notes) {
            if (note.id === theNoteId) {
                if (theAlreadyFinished) {
                    note.finishedDate = undefined;
                }
                else {
                    note.finishedDate = moment().format('YYYY-MM-DD');
                }
                saveNotesToStorage(notes);
                break;
            }
        }
    }

    return {
        getNotes,
        getNote,
        deleteNote,
        saveNote,
        finishNote,
        getNoteCounter
    };
})();
