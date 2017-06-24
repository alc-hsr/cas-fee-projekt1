'use strict';

const indexView = (function() {

    let createNoteListHtml;
    let createNoteCounterHtml;

    document.addEventListener('DOMContentLoaded', () => {
        createNoteListHtml = Handlebars.compile($('#note-list-template').html());
        createNoteCounterHtml = Handlebars.compile($('#note-count-template').html());
    });

    function renderNotes(theNotes) {
        $('#note-list').html(createNoteListHtml(theNotes));
        markFinishedNotes(theNotes.filter(note => note.finishedDate));
    }

    function renderNoteCounter(theNoteCounter) {
        $('#note-count').html(createNoteCounterHtml(theNoteCounter));
    }

    function selectStyle(theStyle) {
        $('#styleswitcher').val(theStyle);
    }

    function selectSortOrder(theSortOrder) {
        $('#' + theSortOrder).prop('checked', true);
    }

    function selectShowFinished(theSelected) {
        $('#filtershowfinished').prop('checked', theSelected);
    }

    function getSelectedStyle() {
        return $('#styleswitcher').val();
    }

    function getSelectedSortOrder() {
        return $('input[name=sortorder]:checked').val();
    }

    function isShowFinishedSelected() {
        return $('#filtershowfinished').is(':checked');
    }

    function markFinishedNotes(theFinishedNotes) {
        let finishedNoteIds = theFinishedNotes.map(note => note.id);
        let noteContainerElements = [... $('.note-container')];
        noteContainerElements.forEach(noteContainerElement => {
            let noteId = parseInt(noteContainerElement.getAttribute('data-noteid'));
            if (finishedNoteIds.includes(noteId)) {
                noteContainerElement.classList.add('note--finished');
            }
        });
    }

    return {
        renderNotes,
        renderNoteCounter,
        selectStyle,
        selectSortOrder,
        selectShowFinished,
        getSelectedStyle,
        getSelectedSortOrder,
        isShowFinishedSelected
    };
})();
