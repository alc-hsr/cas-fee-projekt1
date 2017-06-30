'use strict';

class Note {
    constructor() {
        this._id = undefined;
        this.title = undefined;
        this.description = undefined;
        this.importance = 0;
        this.creationDate = moment().format('YYYY-MM-DDTHH:mm:ss');
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

    equalsTo(theNote) {
        let isEqual = true;
        isEqual = isEqual && this._id === theNote._id;
        isEqual = isEqual && this.title === theNote.title;
        isEqual = isEqual && this.description === theNote.description;
        isEqual = isEqual && this.importance === theNote.importance;
        isEqual = isEqual && this.creationDate === theNote.creationDate;
        isEqual = isEqual && this.dueDate === theNote.dueDate;
        isEqual = isEqual && this.finishedDate === theNote.finishedDate;
        return isEqual;
    }
}

const noteModule = (function() {

    function loadNotes(theLoadFinishedNotes) {
        return ajaxRequest('GET', 'notes?loadFinishedNotes=' + theLoadFinishedNotes);
    }

    function countNotes(theLoadFinishedNotes) {
        return ajaxRequest('GET', 'notes/count?loadFinishedNotes=' + theLoadFinishedNotes);
    }

    function loadNote(theNoteId) {
        return ajaxRequest('GET', 'notes/' + theNoteId);
    }

    function insertNote(theNote) {
        return ajaxRequest('POST', 'notes', { note : theNote });
    }

    function updateNote(theNote) {
        return ajaxRequest('PUT', 'notes/' + theNote._id, { note : theNote });
    }

    function deleteNote(theNoteId) {
        return ajaxRequest('DELETE', 'notes/' + theNoteId);
    }

    function finishNote(theNoteId) {
        return ajaxRequest('PUT', 'notes/'  + theNoteId + '/finish');
    }

    function unfinishNote(theNoteId) {
        return ajaxRequest('PUT', 'notes/' + theNoteId + '/unfinish');
    }

    function ajaxRequest(theMethod, theUrlPath, theData) {
        return $.ajax({
            method : theMethod,
            url : 'http://localhost:3000/' + theUrlPath,
            dataType : 'json',
            contentType : 'application/json',
            data : JSON.stringify(theData)
        });
    }

    return {
        loadNotes,
        countNotes,
        loadNote,
        insertNote,
        updateNote,
        deleteNote,
        finishNote,
        unfinishNote
    };
})();
