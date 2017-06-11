'use strict';

(function(noteModule, settingsModule, styleSwitcherModule) {

    window.onload = function() {
        HandlebarsModule.registerHelpers();

        // Init style switcher
        let styleSwitcherElement = $('#styleswitcher');
        styleSwitcherElement.val(settingsModule.getActiveStyle());
        styleSwitcherElement.on('change', onStyleChanged);

        // Init sort options
        let activeSortOrder = settingsModule.getActiveSortOrder();
        $('#' + activeSortOrder).prop('checked', true);
        $('#sortByDueDate').on('click', onSortOrderChanged);
        $('#sortByCreationDate').on('click', onSortOrderChanged);
        $('#sortByImportance').on('click', onSortOrderChanged);

        // Init filter
        let showFinishedCheckbox = $('#filtershowfinished');
        showFinishedCheckbox.prop('checked', settingsModule.isShowFinished());
        showFinishedCheckbox.on('click', onShowFinishedFilterClicked);

        // Init listeners for note actions
        $('#newbutton').on('click', onCreateNewNote);
        let noteListElement = $('#note-list');
        noteListElement.on('click', '.editbutton', onShowNoteDetails);
        noteListElement.on('click', '.deletebutton', onDeleteNote);
        noteListElement.on('click', '.finishcheckbox', onFinishNote);

        loadNotes();
    };

    function onStyleChanged() {
        let selectedStyle = $('#styleswitcher').val();
        styleSwitcherModule.activateStyle(selectedStyle);
        settingsModule.setActiveStyle(selectedStyle);
    }

    function onSortOrderChanged() {
        let sortOrder = $('input[name=sortorder]:checked').val();
        settingsModule.setActiveSortOrder(sortOrder);
        loadNotes();
    }

    function onShowFinishedFilterClicked() {
        let isShowFinished = $('#filtershowfinished').is(':checked');
        settingsModule.setShowFinished(isShowFinished);
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
        let createNoteListHtml = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
        document.getElementById('note-list').innerHTML = createNoteListHtml(sortedNotes);

        let noteCounter = noteModule.getNoteCounter();
        noteCounter.countDisplaying = sortedNotes.length;
        let createNoteCounterHtml = Handlebars.compile(document.getElementById('note-count-template').innerHTML);
        document.getElementById('note-count').innerHTML = createNoteCounterHtml(noteCounter);
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
})(NoteModule, SettingsModule, StyleSwitcherModule);
