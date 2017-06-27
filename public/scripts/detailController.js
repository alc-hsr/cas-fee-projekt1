'use strict';

(function(detailView, noteModule) {

    let currentNote = {};

    document.addEventListener('DOMContentLoaded', () => {
        detailView.renderImportance();

        $('#savedetail').on('click', onSaveNote);
        $('#canceldetail').on('click', onCancelDetailPage);
        $('#importance-field').on('click', '.importance-star', onImportanceStarClicked);

        loadCurrentNote();
    });

    function loadCurrentNote() {
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

        if (idParameter) {
            let loadRequest = noteModule.loadNote(idParameter);
            loadRequest.done((data) => {
                currentNote = data.note;
                detailView.loadNote(currentNote);
            });
        }
    }

    function onSaveNote() {
        currentNote.title = detailView.getTitle();
        currentNote.description = detailView.getDescription();
        currentNote.importance = detailView.getImportance();
        currentNote.dueDate = detailView.getDueDate();

        saveNote(currentNote).done(() => {
            window.location.replace('index.html');
        }).fail((result) => {
            if (result.responseText === 'invalid-duedate') {
                detailView.markInvalidDueDateFields();
            }
        });
    }

    function saveNote(theNote) {
        if (theNote._id) {
            return noteModule.updateNote(theNote);
        }
        else {
            return noteModule.insertNote(theNote);
        }
    }

    function onCancelDetailPage() {
        window.location.replace('index.html');
    }

    function onImportanceStarClicked(theEvent) {
        let clickedImportance = parseInt(theEvent.target.getAttribute('data-importance'));
        let previousImportance = detailView.getImportance();
        if (previousImportance === clickedImportance) {
            clickedImportance = 0;
        }
        detailView.setImportance(clickedImportance);
    }
})(detailView, noteModule);
