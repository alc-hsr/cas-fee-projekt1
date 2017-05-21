'use strict';

function createNewNote() {
    location.href = 'detail.html';
}

function finishNote(id, isAlreadyFinished) {
    if (isAlreadyFinished) {
        console.log('TODO: Unfinish note with ID: ' + id);
    }
    else {
        console.log('TODO: Finish note with ID: ' + id);
    }
    reloadNotes();
}

function showNoteDetails(id) {
    location.href = 'detail.html?id=' + id;
}

function deleteNote(id) {
    console.log('TODO: Delete note with ID: ' + id);
}

function reloadNotes() {
    let showFinished = $("#filtershowfinished").is(":checked");
    let sortOrder = $("input[name=sortorder]:checked").val();
    loadNotes(showFinished, sortOrder);
}

function loadNotes(showFinished, sortOrder) {
    let originalData = getSampleData();
    let filteredData = filterNotes(originalData, showFinished);
    let sortedData = sortNotes(filteredData, sortOrder);
    let template = Handlebars.compile(document.getElementById("notetemplate").innerHTML);
    document.getElementById("notecontent").innerHTML =  template(sortedData);
}

function filterNotes(originalData, showFinished) {
    let filteredNotes = originalData.notes.filter(function(note) {
        return showFinished || !note.finishDate;
    });
    return {
        notes: filteredNotes
    };
}

function sortNotes(originalData, sortOrder) {
    console.log('TODO: Sort notes by: ' + sortOrder);
    return originalData;
}

function getSampleData() {
    return {
        notes: [
            {id: 1, importance: 1, creationDate: '2001-01-01', dueDate: '2021-01-01', finishDate: '2017-05-03', title: 'Erste Notiz', description: 'Beschreibung der ersten Notiz'},
            {id: 2, importance: 2, creationDate: '2002-02-02', dueDate: '2022-02-02', finishDate: undefined, title: 'Zweite Notiz', description: 'Beschreibung der zweiten Notiz'},
            {id: 3, importance: 3, creationDate: '2003-03-03', dueDate: '2023-03-03', finishDate: undefined, title: 'Dritte Notiz', description: 'Beschreibung der dritten Notiz'},
            {id: 4, importance: 4, creationDate: '2004-04-04', dueDate: '2024-04-04', finishDate: '2017-05-03', title: 'Vierte Notiz', description: 'Beschreibung der vierten Notiz'},
            {id: 5, importance: 5, creationDate: '2005-05-05', dueDate: '2025-05-05', finishDate: undefined, title: 'Fünfte Notiz', description: 'Beschreibung der fünften Notiz'},
            {id: 6, importance: 0, creationDate: '2006-06-06', dueDate: '2026-06-06', finishDate: undefined, title: 'Sechste Notiz', description: 'Beschreibung der sechsten Notiz'},
            {id: 7, importance: 0, creationDate: '2007-07-07', dueDate: '2027-07-07', finishDate: '2017-05-03', title: 'Siebte Notiz', description: 'Beschreibung der siebten Notiz'},
            {id: 8, importance: 1, creationDate: '2008-08-08', dueDate: '2028-08-08', finishDate: undefined, title: 'Achte Notiz', description: 'Beschreibung der achten Notiz'},
            {id: 9, importance: 0, creationDate: '2009-09-09', dueDate: '2029-09-09', finishDate: undefined, title: 'Neunte Notiz', description: 'Beschreibung der neunten Notiz'},
            {id: 10, importance: 0, creationDate: '2010-10-10', dueDate: '2030-10-10', finishDate: '2017-05-03', title: 'Zehnte Notiz', description: 'Beschreibung der zehnten Notiz'},
            {id: 11, importance: 0, creationDate: '2011-11-11', dueDate: '2031-11-11', finishDate: undefined, title: 'Elfte Notiz', description: 'Beschreibung der elften Notiz'},
            {id: 12, importance: 0, creationDate: '2012-12-12', dueDate: '2032-12-12', finishDate: undefined, title: 'Zwölfte Notiz', description: 'Beschreibung der zwölften Notiz'}
        ]
    };
}
