function getSampleData() {
    return {
        notes: [
            {id: 1, title: 'Erste Notiz', description: 'Beschreibung der ersten Notiz', importance: 1, creationDate: moment('2001-01-01').format('YYYY-MM-DD'), dueDate: moment('2021-01-01').format('YYYY-MM-DD'), finishDate: moment('2017-05-09').format('YYYY-MM-DD')},
            {id: 2, title: 'Zweite Notiz', description: 'Beschreibung der zweiten Notiz', importance: 2, creationDate: moment('2002-02-02').format('YYYY-MM-DD'), dueDate: moment('2022-02-02').format('YYYY-MM-DD')},
            {id: 3, title: 'Dritte Notiz', description: 'Beschreibung der dritten Notiz', importance: 3, creationDate: moment('2003-03-03').format('YYYY-MM-DD'), dueDate: moment('2023-03-03').format('YYYY-MM-DD')},
            {id: 4, title: 'Vierte Notiz', description: 'Beschreibung der vierten Notiz', importance: 4, creationDate: moment('2004-04-04').format('YYYY-MM-DD'), dueDate: moment('2024-04-04').format('YYYY-MM-DD'), finishDate: moment('2017-05-08').format('YYYY-MM-DD')},
            {id: 5, title: 'Fünfte Notiz', description: 'Beschreibung der fünften Notiz', importance: 5, creationDate: moment('2005-05-05').format('YYYY-MM-DD'), dueDate: moment('2025-05-05').format('YYYY-MM-DD')},
            {id: 6, title: 'Sechste Notiz', description: 'Beschreibung der sechsten Notiz', importance: 0, creationDate: moment('2006-06-06').format('YYYY-MM-DD'), dueDate: moment('2026-06-06').format('YYYY-MM-DD')},
            {id: 7, title: 'Siebte Notiz', description: 'Beschreibung der siebten Notiz', importance: 0, creationDate: moment('2007-07-07').format('YYYY-MM-DD'), dueDate: moment('2027-07-07').format('YYYY-MM-DD'), finishDate: moment('2017-05-15').format('YYYY-MM-DD')},
            {id: 8, title: 'Achte Notiz', description: 'Beschreibung der achten Notiz', importance: 1, creationDate: moment('2008-08-08').format('YYYY-MM-DD'), dueDate: moment('2028-08-08').format('YYYY-MM-DD')},
            {id: 9, title: 'Neunte Notiz', description: 'Beschreibung der neunten Notiz', importance: 0, creationDate: moment('2009-09-09').format('YYYY-MM-DD'), dueDate: moment('2029-09-09').format('YYYY-MM-DD')},
            {id: 10, title: 'Zehnte Notiz', description: 'Beschreibung der zehnten Notiz', importance: 0, creationDate: moment('2010-10-10').format('YYYY-MM-DD'), dueDate: moment('2030-10-10').format('YYYY-MM-DD'), finishDate: moment('2017-05-01').format('YYYY-MM-DD')},
            {id: 11, title: 'Elfte Notiz', description: 'Beschreibung der elften Notiz', importance: 0, creationDate: moment('2011-11-11').format('YYYY-MM-DD'), dueDate: moment('2031-11-11').format('YYYY-MM-DD')},
            {id: 12, title: 'Zwölfte Notiz', description: 'Beschreibung der zwölften Notiz', importance: 0, creationDate: moment('2012-12-12').format('YYYY-MM-DD'), dueDate: moment('2032-12-12').format('YYYY-MM-DD')}
        ]
    };
}

function getAllNotes() {
    let notes = localStorage.getItem('notes');
    if (!notes) {
        localStorage.setItem('notes', JSON.stringify({notes: []}));
        notes = localStorage.getItem('notes');
    }
    return JSON.parse(notes);
}
