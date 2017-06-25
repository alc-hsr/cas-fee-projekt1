'use strict';

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

    function saveNote(theNote) {
        return ajaxRequest('POST', 'notes', {note: theNote});
    }

    function deleteNote(theNoteId) {
        return ajaxRequest('DELETE', 'notes/' + theNoteId);
    }

    function finishNote(theNoteId) {
        return ajaxRequest('POST', 'notes/finish/' + theNoteId);
    }

    function unfinishNote(theNoteId) {
        return ajaxRequest('POST', 'notes/unfinish/' + theNoteId);
    }

    function ajaxRequest(theMethod, theUrlPath, theData) {
        return $.ajax({
            method: theMethod,
            url: 'http://localhost:3000/' + theUrlPath,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(theData)
        });
    }

    return {
        loadNotes,
        countNotes,
        loadNote,
        saveNote,
        deleteNote,
        finishNote,
        unfinishNote
    };
})();
