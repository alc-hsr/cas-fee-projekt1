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

    static mergeNote(theFromNote, theToNote) {
        theToNote.id = theFromNote.id;
        theToNote.title = theFromNote.title;
        theToNote.description = theFromNote.description;
        theToNote.importance = theFromNote.importance;
        theToNote.creationDate = theFromNote.creationDate;
        theToNote.dueDate = theFromNote.dueDate;
        theToNote.finishedDate = theFromNote.finishedDate;
    }
}

class NoteCounter {
    constructor() {
        this._countAll = 0;
        this._countFinished = 0;
        this._countDisplaying = 0;
    }

    get countAll() {
        return this._countAll;
    }

    set countAll(countAll) {
        this._countAll = countAll;
    }

    incrementCountAll() {
        this._countAll++;
    }

    get countFinished() {
        return this._countFinished;
    }

    set countFinished(countFinished) {
        this._countFinished = countFinished;
    }

    incrementCountFinished() {
        this._countFinished++;
    }

    get countDisplaying() {
        return this._countDisplaying;
    }

    set countDisplaying(countDisplaying) {
        this._countDisplaying = countDisplaying;
    }

    incrementCountDisplaying() {
        this._countDisplaying++;
    }
}

let NoteModule = (function() {

    function getAllNotesFromStorage() {
        let notes = localStorage.getItem('notes');
        if (!notes) {
            localStorage.setItem('notes', JSON.stringify([]));
            notes = localStorage.getItem('notes');
        }
        return JSON.parse(notes);
    }

    function getNextNoteId() {
        let notes = getAllNotesFromStorage();
        let nextNoteId = 1;
        while (isExistingId(nextNoteId, notes)) {
            nextNoteId++;
        }
        return nextNoteId;
    }

    function isExistingId(theId, theNotes) {
        for (let note of theNotes) {
            if (note.id === theId) {
                return true;
            }
        }
        return false;
    }

    function getNoteCounter() {
        let noteCounter = new NoteCounter();
        for (let note of getAllNotesFromStorage()) {
            noteCounter.incrementCountAll();
            if (note.finishedDate) {
                noteCounter.incrementCountFinished();
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
                localStorage.setItem('notes', JSON.stringify(notes));
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
                    Note.mergeNote(theNote, note);
                    localStorage.setItem('notes', JSON.stringify(notes));
                    break;
                }
            }
        }
        else {
            theNote.id = getNextNoteId();
            notes.push(theNote);
            localStorage.setItem('notes', JSON.stringify(notes));
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
                localStorage.setItem('notes', JSON.stringify(notes));
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
