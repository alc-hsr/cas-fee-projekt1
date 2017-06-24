'use strict';

(function(indexView, noteModule, settingsModule, styleSwitcherModule) {

    let loadedNotes;

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
        sortAndRenderNotes();
    }

    function onShowFinishedFilterClicked() {
        settingsModule.setShowFinished(indexView.isShowFinishedSelected());
        loadNotes();
    }

    function onCreateNewNote() {
        location.href = 'detail.html';
    }

    function onShowNoteDetails(theEvent) {
        location.href = 'detail.html?id=' + theEvent.target.getAttribute('data-noteid');
    }

    function onDeleteNote(theEvent) {
        let deleteRequest = noteModule.deleteNote(theEvent.target.getAttribute('data-noteid'));
        deleteRequest.always(() => {
            loadNotes();
        });
    }

    function onFinishNote(theEvent) {
        let noteId = theEvent.target.getAttribute('data-noteid');
        let isAlreadyFinished = (theEvent.target.getAttribute('data-alreadyfinished') == 'true');

        let getRequest = noteModule.loadNote(noteId);
        getRequest.done((data) => {
            let note = data.note;
            note.finishedDate = isAlreadyFinished ? undefined : moment().format('YYYY-MM-DD');
            let saveRequest = noteModule.saveNote(note);
            saveRequest.always(() => {
                loadNotes();
            });
        }).fail(() => {
            loadNotes();
        });
    }

    function loadNotes() {
        let loadRequest = noteModule.loadNotes(settingsModule.isShowFinished());
        loadRequest.done((data) => {
            loadedNotes = data.notes;
            sortAndRenderNotes();
            indexView.renderNoteCounter(data.noteCounter);
        }).fail((error) => {
            alert('Loading request failed: ' + JSON.stringify(error));
        });
    }

    function sortAndRenderNotes() {
        let sortedNotes = sortNotes(loadedNotes, settingsModule.getActiveSortOrder());
        indexView.renderNotes(sortedNotes);
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
        return compareByDateString(theNote1.dueDate, theNote2.dueDate);
    }

    function compareByCreationDate(theNote1, theNote2) {
        return compareByDateString(theNote1.creationDate, theNote2.creationDate);
    }

    function compareByImportance(theNote1, theNote2) {
        return - compareByInteger(theNote1.importance, theNote2.importance);
    }

    function compareByDateString(theDate1, theDate2) {
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

    function compareByInteger(theInteger1, theInteger2) {
        if (theInteger1 < theInteger2) {
            return -1;
        }
        else if (theInteger1 > theInteger2) {
            return 1;
        }
        return 0;
    }
})(indexView, noteModule, settingsModule, styleSwitcherModule);
