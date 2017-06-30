'use strict';

(function(indexView, noteModule, settingsModule, styleSwitcherModule) {

    const AUTO_REFRESH_INTERVAL = 5000;

    let loadedNotes;
    let interval;

    document.addEventListener('DOMContentLoaded', () => {
        indexView.selectStyle(settingsModule.getActiveStyle());
        indexView.selectSortOrder(settingsModule.getActiveSortOrder());
        indexView.selectShowFinished(settingsModule.isShowFinished());
        indexView.selectAutoRefresh(settingsModule.isAutoRefresh());

        $('#styleswitcher').on('change', onStyleChanged);
        $('#sortoption-duedate').on('click', onSortOrderChanged);
        $('#sortoption-creationdate').on('click', onSortOrderChanged);
        $('#sortoption-importance').on('click', onSortOrderChanged);
        $('#checkbox-show-finished').on('click', onToggleShowFinished);
        $('#checkbox-auto-refresh').on('click', onToggleAutoRefresh);
        $('#button-new').on('click', onCreateNewNote);

        let noteListElement = $('#note-list');
        noteListElement.on('click', '.button-edit', onShowNoteDetails);
        noteListElement.on('click', '.button-delete', onDeleteNote);
        noteListElement.on('click', '.checkbox-finish', onFinishNote);

        loadNotes();
        onToggleAutoRefresh();
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

    function onToggleShowFinished() {
        settingsModule.setShowFinished(indexView.isShowFinishedSelected());
        loadNotes();
    }

    function onToggleAutoRefresh() {
        let isAutoRefresh = indexView.isAutoRefreshSelected();
        settingsModule.setAutoRefresh(isAutoRefresh);

        if (isAutoRefresh) {
            activateAutoRefresh();
        }
        else {
            deactivateAutoRefresh();
        }
    }

    function activateAutoRefresh() {
        interval = setInterval(loadNotes, AUTO_REFRESH_INTERVAL);
    }

    function deactivateAutoRefresh() {
        if (interval) {
            clearInterval(interval);
        }
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
        let isAlreadyFinished = theEvent.target.getAttribute('data-alreadyfinished') === 'true';
        if (isAlreadyFinished) {
            let unfinishRequest = noteModule.unfinishNote(noteId);
            unfinishRequest.always(() => {
                loadNotes();
            });
        }
        else {
            let finishRequest = noteModule.finishNote(noteId);
            finishRequest.always(() => {
                loadNotes();
            });
        }
    }

    function loadNotes() {
        let isShowFinished = settingsModule.isShowFinished();

        let loadRequest = noteModule.loadNotes(isShowFinished);
        loadRequest.done((data) => {
            if (areNotesDifferent(data.notes)) {
                loadedNotes = data.notes.map(note => Note.of(note));
                sortAndRenderNotes();
            }
        });

        let countRequest = noteModule.countNotes(isShowFinished);
        countRequest.done((data) => {
            indexView.renderNoteCounter(data.noteCounter);
        });
    }

    function areNotesDifferent(theNotes) {
        if (!loadedNotes || !theNotes) {
            return true;
        }
        if (loadedNotes.length !== theNotes.length) {
            return true;
        }
        return !loadedNotes.every(loadedNote => theNotes.find(note => loadedNote.equalsTo(note)));
    }

    function sortAndRenderNotes() {
        let sortedNotes = sortNotes(loadedNotes, settingsModule.getActiveSortOrder());
        indexView.renderNotes(sortedNotes);
    }

    function sortNotes(theNotes, theSortOrder) {
        switch (theSortOrder) {
            case 'sortoption-duedate':
                return theNotes.sort(compareByDueDate);
            case 'sortoption-creationdate':
                return theNotes.sort(compareByCreationDate);
            case 'sortoption-importance':
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
