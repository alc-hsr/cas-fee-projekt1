'use strict';

(function() {
    // Init style
    let switcher = document.getElementById("styleswitcher");
    $("#styleswitcher").val(getActiveStyle());
    switcher.addEventListener('change', onStyleChanged);

    // Init sort options
    document.getElementById('sortByDueDate').addEventListener('click', onSortOrderChanged);
    document.getElementById('sortByCreationDate').addEventListener('click', onSortOrderChanged);
    document.getElementById('sortByImportance').addEventListener('click', onSortOrderChanged);
    let activeSortOrder = getActiveSortOrder();
    $('#' + activeSortOrder).prop('checked', true);

    // Init filter
    document.getElementById('filtershowfinished').addEventListener('click', onShowFinishedFilterClicked);
    let showFinished = isShowFinishedEnabled();
    $('#filtershowfinished').prop('checked', showFinished);

    // Init listener for new button
    document.getElementById('newbutton').addEventListener('click', createNewNote);

    // Init listeners for note actions
    let noteContentElement = $('#notecontent');
    noteContentElement.on('click', '.finishcheckbox', function(event) {
        let noteId = event.target.getAttribute('data-noteid');
        let isAlreadyFinished = event.target.getAttribute('data-alreadyfinished');
        finishNote(noteId, (isAlreadyFinished == 'true'));
    });
    noteContentElement.on('click', '.editbutton', function(event) {
        showNoteDetails(event.target.getAttribute('data-noteid'));
    });
    noteContentElement.on('click', '.deletebutton', function(event) {
        deleteNote(event.target.getAttribute('data-noteid'));
    });

    reloadNotes();
})();

function onStyleChanged() {
    let selectedStyle = $("#styleswitcher").val();
    activateStyle(selectedStyle);
    setActiveStyle(selectedStyle);
}

function onSortOrderChanged() {
    let sortOrder = $("input[name=sortorder]:checked").val();
    setActiveSortOrder(sortOrder);
    reloadNotes();
}

function onShowFinishedFilterClicked() {
    let isShowFinishedEnabled = $("#filtershowfinished").is(":checked");
    setShowFinished(isShowFinishedEnabled);
    reloadNotes();
}

function createNewNote() {
    location.href = 'detail.html';
}

function finishNote(noteId, isAlreadyFinished) {
    let notesContainer = getAllNotes();
    noteId = parseInt(noteId);
    for (let index = 0; index < notesContainer.notes.length; index++) {
        let note = notesContainer.notes[index];
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
    let showFinished = isShowFinishedEnabled();
    let sortOrder = getActiveSortOrder();
    loadNotes(showFinished, sortOrder);
}

function loadNotes(showFinished, sortOrder) {
    let originalNotesContainer = getAllNotes();
    let noteCounter = getNoteCounter(originalNotesContainer);

    let filteredNotesContainer = filterNotes(originalNotesContainer, showFinished);
    noteCounter.countDisplaying = filteredNotesContainer.notes.length;

    let sortedNotesContainer = sortNotes(filteredNotesContainer, sortOrder);
    let createNotesHtml = Handlebars.compile(document.getElementById("notetemplate").innerHTML);
    document.getElementById("notecontent").innerHTML = createNotesHtml(sortedNotesContainer);

    updateNoteCounter(noteCounter);
}

function getNoteCounter(notesContainer) {
    let countAll = 0;
    let countFinished = 0;
    for (let index = 0; index < notesContainer.notes.length; index++) {
        let note = notesContainer.notes[index];
        countAll++;
        if (note.finishDate) {
            countFinished++;
        }
    }
    return {
        countAll: countAll,
        countFinished: countFinished
    };
}

function updateNoteCounter(noteCounter) {
    let createCounterHtml = Handlebars.compile(document.getElementById("notecounttemplate").innerHTML);
    document.getElementById("notecount").innerHTML = createCounterHtml(noteCounter);
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
        case 'sortByDueDate':
            return {
                notes: originalNotesContainer.notes.sort(compareByDueDate)
            };
        case 'sortByCreationDate':
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

function compareByDueDate(note1, note2) {
    return compareByDate(note1.dueDate, note2.dueDate);
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
