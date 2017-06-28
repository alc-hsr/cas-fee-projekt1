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
