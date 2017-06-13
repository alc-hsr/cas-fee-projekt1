'use strict';

class Note {
    constructor() {
        this._id = undefined;
        this._title = undefined;
        this._description = undefined;
        this._importance = 0;
        this._creationDate = moment().format('YYYY-MM-DD');
        this._dueDate = undefined;
        this._finishedDate = undefined;
    }

    static of(theNote) {
        let note = new Note();
        note.mergeNote(theNote);
        return note;
    }

    mergeNote(theNote) {
        return Object.assign(this, theNote);
    }

    get id() {
        return this._id;
    }

    set id(theId) {
        this._id = theId;
    }

    get title() {
        return this._title;
    }

    set title(theTitle) {
        this._title = theTitle;
    }

    get description() {
        return this._description;
    }

    set description(theDescription) {
        this._description = theDescription;
    }

    get importance() {
        return this._importance;
    }

    set importance(theImportance) {
        this._importance = theImportance;
    }

    get creationDate() {
        return this._creationDate;
    }

    set creationDate(theCreationDate) {
        this._creationDate = theCreationDate;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(theDueDate) {
        this._dueDate = theDueDate;
    }

    get finishedDate() {
        return this._finishedDate;
    }

    set finishedDate(theFinishedDate) {
        this._finishedDate = theFinishedDate;
    }
}

class NoteCounter {
    constructor() {
        this._countAll = 0;
        this._countFinished = 0;
        this._countDisplaying = 0;
    }

    incrementCountAll() {
        this._countAll++;
    }

    incrementCountFinished() {
        this._countFinished++;
    }

    incrementCountDisplaying() {
        this._countDisplaying++;
    }

    get countAll() {
        return this._countAll;
    }

    set countAll(theCountAll) {
        this._countAll = theCountAll;
    }

    get countFinished() {
        return this._countFinished;
    }

    set countFinished(theCountFinished) {
        this._countFinished = theCountFinished;
    }

    get countDisplaying() {
        return this._countDisplaying;
    }

    set countDisplaying(theCountDisplaying) {
        this._countDisplaying = theCountDisplaying;
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
            theNote.id = getNextNoteId();
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
