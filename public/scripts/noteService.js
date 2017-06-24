'use strict';

const noteModule = (function() {

    function loadNotes(theLoadFinished) {
        return ajaxRequest('GET', 'notes?loadFinishedNotes=' + theLoadFinished);
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
        loadNote,
        saveNote,
        deleteNote
    };
})();
