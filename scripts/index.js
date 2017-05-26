'use strict';

(function() {
    let switcher = document.getElementById("styleswitcher");

    let activeStyle = getActiveStyle();
    $("#styleswitcher").val(activeStyle);
    activateStyle(activeStyle);

    switcher.addEventListener('change', function() {
        let selectedStyle = $("#styleswitcher").val();
        activateStyle(selectedStyle);
    });
})();

function createNewNote() {
    location.href = 'detail.html';
}

function finishNote(noteId, isAlreadyFinished) {
    let notesContainer = getAllNotes();
    noteId = parseInt(noteId);
    for (let note of notesContainer.notes) {
        if (note.id === noteId) {
            if (isAlreadyFinished) {
                note.finishDate = undefined;
            }
            else {
                note.finishDate = moment().format('YYYY-MM-DD');
            }
            localStorage.setItem('notes', JSON.stringify(notesContainer));
            break;
        }
    }
    reloadNotes();
}

function showNoteDetails(noteId) {
    location.href = 'detail.html?id=' + noteId;
}

function deleteNote(noteId) {
    let notesContainer = getAllNotes();
    noteId = parseInt(noteId);
    for (let index = 0; index < notesContainer.notes.length; index++) {
        if (notesContainer.notes[index].id === noteId) {
            notesContainer.notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notesContainer));
            break;
        }
    }
    reloadNotes();
}

function reloadNotes() {
    let showFinished = $("#filtershowfinished").is(":checked");
    let sortOrder = $("input[name=sortorder]:checked").val();
    loadNotes(showFinished, sortOrder);
}

function loadNotes(showFinished, sortOrder) {
    let originalNotesContainer = getAllNotes();
    let filteredNotesContainer = filterNotes(originalNotesContainer, showFinished);
    let sortedNotesContainer = sortNotes(filteredNotesContainer, sortOrder);
    let template = Handlebars.compile(document.getElementById("notetemplate").innerHTML);
    document.getElementById("notecontent").innerHTML =  template(sortedNotesContainer);
}

function filterNotes(originalNotesContainer, showFinished) {
    let filteredNotes = originalNotesContainer.notes.filter(function(note) {
        return showFinished || !note.finishDate;
    });
    return {
        notes: filteredNotes
    };
}

function sortNotes(originalNotesContainer, sortOrder) {
    switch (sortOrder) {
        case 'sortByFinishDate':
            return {
                notes: originalNotesContainer.notes.sort(compareByFinishDate)
            };
        case 'sortByCreatedDate':
            return {
                notes: originalNotesContainer.notes.sort(compareByCreationDate)
            };
        case 'sortByImportance':
            return {
                notes: originalNotesContainer.notes.sort(compareByImportance)
            };
    }
    return originalNotesContainer;
}

function compareByFinishDate(note1, note2) {
    return compareByDate(note1.finishDate, note2.finishDate);
}

function compareByCreationDate(note1, note2) {
    return compareByDate(note1.creationDate, note2.creationDate);
}

function compareByImportance(note1, note2) {
    return - compareByInt(note1.importance, note2.importance);
}

function compareByDate(date1, date2) {
    if (!date1 && !date2) {
        return 0;
    }
    else if (!date1) {
        return 1;
    }
    else if (!date2) {
        return -1;
    }
    return date1.localeCompare(date2);
}

function compareByInt(int1, int2) {
    if (int1 < int2) {
        return -1;
    }
    else if (int1 > int2) {
        return 1;
    }
    return 0;
}
