'use strict';

(function(indexView, noteModule, settingsModule, styleSwitcherModule) {

    document.addEventListener('DOMContentLoaded', () => {
        indexView.selectStyle(settingsModule.getActiveStyle());
        indexView.selectSortOrder(settingsModule.getActiveSortOrder());
        indexView.selectShowFinished(settingsModule.isShowFinished());

        $('#styleswitcher').on('change', onStyleChanged);
        $('#sortByDueDate').on('click', onSortOrderChanged);
        $('#sortByCreationDate').on('click', onSortOrderChanged);
        $('#sortByImportance').on('click', onSortOrderChanged);
        $('#filtershowfinished').on('click', onShowFinishedFilterClicked);
        $('#newbutton').on('click', onCreateNewNote);

        let noteListElement = $('#note-list');
        noteListElement.on('click', '.editbutton', onShowNoteDetails);
        noteListElement.on('click', '.deletebutton', onDeleteNote);
        noteListElement.on('click', '.finishcheckbox', onFinishNote);

        loadNotes();
    });

    function onStyleChanged() {
        let selectedStyle = indexView.getSelectedStyle();
        styleSwitcherModule.activateStyle(selectedStyle);
        settingsModule.setActiveStyle(selectedStyle);
    }

    function onSortOrderChanged() {
        settingsModule.setActiveSortOrder(indexView.getSelectedSortOrder());
        loadNotes();
    }

    function onShowFinishedFilterClicked() {
        settingsModule.setShowFinished(indexView.isShowFinishedSelected());
        loadNotes();
    }

    function onCreateNewNote() {
        location.href = 'detail.html';
    }

    function onShowNoteDetails(event) {
        location.href = 'detail.html?id=' + event.target.getAttribute('data-noteid');
    }

    function onDeleteNote(event) {
        noteModule.deleteNote(event.target.getAttribute('data-noteid'));
        loadNotes();
    }

    function onFinishNote(event) {
        let noteId = event.target.getAttribute('data-noteid');
        let isAlreadyFinished = event.target.getAttribute('data-alreadyfinished');
        noteModule.finishNote(noteId, (isAlreadyFinished == 'true'));
        loadNotes();
    }

    function loadNotes() {
        let notes = noteModule.getNotes(settingsModule.isShowFinished());
        let sortedNotes = sortNotes(notes, settingsModule.getActiveSortOrder());
        indexView.renderNotes(sortedNotes);

        let noteCounter = noteModule.getNoteCounter();
        noteCounter.countDisplaying = sortedNotes.length;
        indexView.renderNoteCounter(noteCounter);
    }

    function sortNotes(theNotes, theSortOrder) {
        switch (theSortOrder) {
            case 'sortByDueDate':
                return theNotes.sort(compareByDueDate);
            case 'sortByCreationDate':
                return theNotes.sort(compareByCreationDate);
            case 'sortByImportance':
                return theNotes.sort(compareByImportance);
        }
        return theNotes;
    }

    function compareByDueDate(theNote1, theNote2) {
        return compareByDate(theNote1.dueDate, theNote2.dueDate);
    }

    function compareByCreationDate(theNote1, theNote2) {
        return compareByDate(theNote1.creationDate, theNote2.creationDate);
    }

    function compareByImportance(theNote1, theNote2) {
        return - compareByInt(theNote1.importance, theNote2.importance);
    }

    function compareByDate(theDate1, theDate2) {
        if (!theDate1 && !theDate2) {
            return 0;
        }
        else if (!theDate1) {
            return 1;
        }
        else if (!theDate2) {
            return -1;
        }
        return theDate1.localeCompare(theDate2);
    }

    function compareByInt(theInteger1, theInteger2) {
        if (theInteger1 < theInteger2) {
            return -1;
        }
        else if (theInteger1 > theInteger2) {
            return 1;
        }
        return 0;
    }
})(indexView, noteModule, settingsModule, styleSwitcherModule);
