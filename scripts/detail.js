'use strict';

(function() {
    activateStyle(getActiveStyle());

    let currentNoteId = getCurrentNoteId();
    if (currentNoteId) {
        loadNote(currentNoteId);
    }
    else {
        $("#creationdatelabel").hide();
        $("#creationdate").hide();
        $("#finisheddatelabel").hide();
        $("#finisheddate").hide();
    }

    document.getElementById('savedetail').addEventListener('click', saveNote);
    document.getElementById('canceldetail').addEventListener('click', cancelDetailPage);
    document.getElementById('importanceitem').addEventListener('change', onImportanceAdjusted);

    let importanceItem = $('#importanceitem');
    importanceItem.on('click', '.importancestar', (event) => {
        let importance = parseInt(event.target.getAttribute('data-importance'));
        let importanceItem = $('#importanceitem');
        let previousImportance = parseInt(importanceItem.val());
        if (previousImportance === importance) {
            importance = 0;
        }
        importanceItem.val(importance);
        onImportanceAdjusted();
    });

    onImportanceAdjusted();
})();

function getCurrentNoteId() {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        return parseInt(searchParams.get('id'));
    }
    return undefined;
}

function onImportanceAdjusted() {
    let importanceData = [];
    let importance = $("#importanceitem").val();
    for (let index = 1; index <= 5; index++) {
        importanceData.push({selected: index <= importance, importance: index});
    }
    let createImportanceStarsHtml = Handlebars.compile(document.getElementById("importanceitemtemplate").innerHTML);
    document.getElementById("importanceitem").innerHTML = createImportanceStarsHtml({importanceData: importanceData});
}

function loadNote(noteId) {
    let note = getNote(noteId);
    if (note !== null) {
        $("#title").val(note.title);
        $("#description").val(note.description);
        $("#importanceitem").val(note.importance);
        $("#duedate").val(note.dueDate);
        $("#creationdate").val(note.creationDate);
        $("#finisheddate").val(note.finishDate);
    }
}

function getNote(noteId) {
    noteId = parseInt(noteId);
    let notesContainer = getAllNotes();
    for (let note of notesContainer.notes) {
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
    let title = $("#title").val();
    let description = $("#description").val();
    let importance = $("#importanceitem").val();
    let dueDate = $("#duedate").val();

    let notesContainer = getAllNotes();
    let noteId = getCurrentNoteId();
    if (noteId) {
        for (let note of notesContainer.notes) {
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
