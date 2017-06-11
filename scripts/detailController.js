'use strict';

(function(noteModule) {

    let currentNote;

    window.onload = function() {
        HandlebarsModule.registerHelpers();

        currentNote = getCurrentNote();
        if (currentNote.id) {
            loadNote(currentNote);
            printSubTitle(true);
        }
        else {
            $('#creationdate-label').hide();
            $('#creationdate-field').hide();
            $('#finisheddate-label').hide();
            $('#finisheddate-field').hide();
            printSubTitle(false);
        }

        $('#savedetail').on('click', onSaveNote);
        $('#canceldetail').on('click', onCancelDetailPage);
        $('#importance-field').on('click', '.importance-star', onImportanceStarClicked);

        onImportanceAdjusted();
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

    function printSubTitle(theEditMode) {
        let createNoteModeHtml = Handlebars.compile(document.getElementById('note-mode-template').innerHTML);
        document.getElementById('note-mode').innerHTML = createNoteModeHtml({isEditMode: theEditMode});
    }

    function onImportanceAdjusted() {
        let importanceData = [];
        let importance = $('#importance-field').val();
        for (let index = 1; index <= 5; index++) {
            importanceData.push({selected: index <= importance, importance: index});
        }
        let createImportanceFieldHtml = Handlebars.compile(document.getElementById('importance-field-template').innerHTML);
        document.getElementById('importance-field').innerHTML = createImportanceFieldHtml({importanceData: importanceData});
    }

    function loadNote(theNote) {
        $('#title-field').val(theNote.title);
        $('#description-field').val(theNote.description);
        $('#importance-field').val(theNote.importance);
        $('#duedate-field').val(theNote.dueDate);
        $('#creationdate-field').val(theNote.creationDate);
        $('#finisheddate-field').val(theNote.finishedDate);
    }

    function onSaveNote() {
        let dueDateField = $('#duedate-field');

        currentNote.title = $('#title-field').val();
        currentNote.description = $('#description-field').val();
        currentNote.importance = $('#importance-field').val();
        currentNote.dueDate = dueDateField.val();

        if (noteModule.saveNote(currentNote)) {
            window.location.replace('index.html');
        }
        else {
            dueDateField.toggleClass('border--red', true);
            $('#duedate-label').toggleClass('font--red', true);
            $('#duedate-label-invalid').prop('hidden', false);
        }
    }

    function onCancelDetailPage() {
        window.location.replace('index.html');
    }

    function onImportanceStarClicked(event) {
        let importance = parseInt(event.target.getAttribute('data-importance'));
        let importanceField = $('#importance-field');
        let previousImportance = parseInt(importanceField.val());
        if (previousImportance === importance) {
            importance = 0;
        }
        importanceField.val(importance);
        onImportanceAdjusted();
    }
})(NoteModule);
