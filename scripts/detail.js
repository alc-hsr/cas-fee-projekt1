'use strict';

(function() {
    activateStyle(getActiveStyle());

    let currentNoteId = getCurrentNoteIdIfNoteExists();
    if (currentNoteId) {
        loadNote(currentNoteId);
        printSubTitle(true);
    }
    else {
        $("#creationdate-label").hide();
        $("#creationdate-field").hide();
        $("#finisheddate-label").hide();
        $("#finisheddate-field").hide();
        printSubTitle(false);
    }

    document.getElementById('savedetail').addEventListener('click', saveNote);
    document.getElementById('canceldetail').addEventListener('click', cancelDetailPage);

    let importanceField = $('#importance-field');
    importanceField.on('click', '.importance-star', function(event) {
        let importance = parseInt(event.target.getAttribute('data-importance'));
        let importanceField = $('#importance-field');
        let previousImportance = parseInt(importanceField.val());
        if (previousImportance === importance) {
            importance = 0;
        }
        importanceField.val(importance);
        onImportanceAdjusted();
    });

    onImportanceAdjusted();
})();

function printSubTitle(isEditMode) {
    let createNoteModeHtml = Handlebars.compile(document.getElementById("notemodetemplate").innerHTML);
    document.getElementById("notemode").innerHTML = createNoteModeHtml({isEditMode: isEditMode});
}

function getCurrentNoteIdIfNoteExists() {
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

    if (noteId && getNote(noteId) !== null) {
        return noteId;
    }
    return undefined;
}

function onImportanceAdjusted() {
    let importanceData = [];
    let importance = $("#importance-field").val();
    for (let index = 1; index <= 5; index++) {
        importanceData.push({selected: index <= importance, importance: index});
    }
    let createImportanceFieldHtml = Handlebars.compile(document.getElementById("importance-field-template").innerHTML);
    document.getElementById("importance-field").innerHTML = createImportanceFieldHtml({importanceData: importanceData});
}

function loadNote(noteId) {
    let note = getNote(noteId);
    if (note !== null) {
        $("#title-field").val(note.title);
        $("#description-field").val(note.description);
        $("#importance-field").val(note.importance);
        $("#duedate-field").val(note.dueDate);
        $("#creationdate-field").val(note.creationDate);
        $("#finisheddate-field").val(note.finishDate);
    }
}

function getNote(noteId) {
    noteId = parseInt(noteId);
    let notesContainer = getAllNotes();
    for (let index = 0; index < notesContainer.notes.length; index++) {
        let note = notesContainer.notes[index];
        if (note.id === noteId) {
            return note;
        }
    }
    return null;
}

function cancelDetailPage() {
    window.location.replace('index.html');
}

function saveNote() {
    let dueDateField = $("#duedate-field");

    let title = $("#title-field").val();
    let description = $("#description-field").val();
    let importance = $("#importance-field").val();
    let dueDate = dueDateField.val();

    if (dueDate && !moment(dueDate).isValid()) {
        dueDateField.toggleClass('border--red', true);
        $('#duedate-label').toggleClass('font--red', true);
        $("#duedate-label-invalid").prop('hidden', false);
        return;
    }

    let notesContainer = getAllNotes();
    let noteId = getCurrentNoteIdIfNoteExists();
    if (noteId) {
        for (let index = 0; index < notesContainer.notes.length; index++) {
            let note = notesContainer.notes[index];
            if (note.id === noteId) {
                note.title = title;
                note.description = description;
                note.importance = importance;
                note.dueDate = dueDate;
                localStorage.setItem('notes', JSON.stringify(notesContainer));
                break;
            }
        }
    }
    else {
        notesContainer.notes.push({
            id: getNextNoteId(),
            importance: importance,
            creationDate: moment().format('YYYY-MM-DD'),
            dueDate: dueDate,
            title: title,
            description: description
        });
        localStorage.setItem('notes', JSON.stringify(notesContainer));
    }

    window.location.replace('index.html');
}

function getNextNoteId() {
    let notesContainer = getAllNotes();
    let nextNoteId = 1;
    while (isExistingId(nextNoteId, notesContainer.notes)) {
        nextNoteId++;
    }
    return nextNoteId;
}

function isExistingId(id, notes) {
    for (let index = 0; index < notes.length; index++) {
        if (notes[index].id === id) {
            return true;
        }
    }
    return false;
}
