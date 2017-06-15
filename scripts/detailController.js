'use strict';

let detailController = (function(detailView, noteModule) {

    let currentNote;

    window.onload = function() {
        detailView.registerHelpers();

        currentNote = getCurrentNote();
        if (currentNote.id) {
            detailView.loadNote(currentNote);
            detailView.renderSubTitle(true);
        }
        else {
            detailView.hideImmutableFields();
            detailView.renderSubTitle(false);
        }

        detailView.renderImportance();

        $('#savedetail').on('click', onSaveNote);
        $('#canceldetail').on('click', onCancelDetailPage);
        $('#importance-field').on('click', '.importance-star', onImportanceStarClicked);
    };

    function getCurrentNote() {
        let idParameter;
        if (Modernizr.urlsearchparams) {
            let searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has('id')) {
                idParameter = searchParams.get('id');
            }
        }
        else {
            let urlParameterSplit = window.location.search.split('?');
            if (urlParameterSplit.length > 1) {
                let parameters = urlParameterSplit[1].split('&');
                for (let index = 0; index < parameters.length; index++) {
                    let parameterValueSplit = parameters[index].split('=');
                    let parameter = parameterValueSplit[0];
                    if (parameter === 'id') {
                        idParameter = parameterValueSplit[1];
                        break;
                    }
                }
            }
        }

        let noteId;
        if (idParameter && new RegExp('^[0-9]+$').test(idParameter)) {
            noteId = parseInt(idParameter);
        }

        if (noteId) {
            let note = noteModule.getNote(noteId);
            if (note) {
                return note;
            }
        }

        return new Note();// Fallback: Create a new Note to prepare insertion
    }

    function onSaveNote() {
        currentNote.title = detailView.getTitle();
        currentNote.description = detailView.getDescription();
        currentNote.importance = detailView.getImportance();
        currentNote.dueDate = detailView.getDueDate();

        if (noteModule.saveNote(currentNote)) {
            window.location.replace('index.html');
        }
        else {
            detailView.markInvalidFields();
        }
    }

    function onCancelDetailPage() {
        window.location.replace('index.html');
    }

    function onImportanceStarClicked(event) {
        let clickedImportance = parseInt(event.target.getAttribute('data-importance'));
        let previousImportance = detailView.getImportance();
        if (previousImportance === clickedImportance) {
            clickedImportance = 0;
        }
        detailView.setImportance(clickedImportance);
        detailView.renderImportance();
    }
})(detailView, noteModule);
