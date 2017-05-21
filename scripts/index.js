'use strict';

function finishNote(id, isAlreadyFinished) {
    if (isAlreadyFinished) {
        console.log('TODO: Unfinish note with ID: ' + id);
    }
    else {
        console.log('TODO: Finish note with ID: ' + id);
    }
    reloadNotes();
}

function editNote(id) {
    console.log('TODO: Edit note with ID: ' + id);
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
            {id: 1, importance: 1, creationDate: '01.01.2001', dueDate: '01.01.2021', finishDate: '03.05.2017', title: 'Erste Notiz', description: 'Beschreibung der ersten Notiz'},
            {id: 2, importance: 2, creationDate: '02.02.2002', dueDate: '02.02.2022', finishDate: undefined, title: 'Zweite Notiz', description: 'Beschreibung der zweiten Notiz'},
            {id: 3, importance: 3, creationDate: '03.03.2003', dueDate: '03.03.2023', finishDate: undefined, title: 'Dritte Notiz', description: 'Beschreibung der dritten Notiz'},
            {id: 4, importance: 4, creationDate: '04.04.2004', dueDate: '01.01.2024', finishDate: '03.05.2017', title: 'Vierte Notiz', description: 'Beschreibung der vierten Notiz'},
            {id: 5, importance: 5, creationDate: '05.05.2005', dueDate: '02.02.2025', finishDate: undefined, title: 'Fünfte Notiz', description: 'Beschreibung der fünften Notiz'},
            {id: 6, importance: 0, creationDate: '06.06.2006', dueDate: '03.03.2026', finishDate: undefined, title: 'Sechste Notiz', description: 'Beschreibung der sechsten Notiz'},
            {id: 7, importance: 0, creationDate: '07.07.2007', dueDate: '01.01.2027', finishDate: '03.05.2017', title: 'Siebte Notiz', description: 'Beschreibung der siebten Notiz'},
            {id: 8, importance: 1, creationDate: '08.08.2008', dueDate: '02.02.2028', finishDate: undefined, title: 'Achte Notiz', description: 'Beschreibung der achten Notiz'},
            {id: 9, importance: 0, creationDate: '09.09.2009', dueDate: '03.03.2029', finishDate: undefined, title: 'Neunte Notiz', description: 'Beschreibung der neunten Notiz'},
            {id: 10, importance: 0, creationDate: '10.10.2010', dueDate: '01.01.2030', finishDate: '03.05.2017', title: 'Zehnte Notiz', description: 'Beschreibung der zehnten Notiz'},
            {id: 11, importance: 0, creationDate: '11.11.2011', dueDate: '02.02.2031', finishDate: undefined, title: 'Elfte Notiz', description: 'Beschreibung der elften Notiz'},
            {id: 12, importance: 0, creationDate: '12.12.2012', dueDate: '03.03.2032', finishDate: undefined, title: 'Zwölfte Notiz', description: 'Beschreibung der zwölften Notiz'}
        ]
    };
}
