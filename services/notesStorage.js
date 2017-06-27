'use strict';

const moment = require('moment');

const Datastore = require('nedb');
const db = new Datastore({ filename : './data/notes.db', autoload : true });

class NoteCounter {
    constructor() {
        this.countAll = 0;
        this.countFinished = 0;
        this.countDisplaying = 0;
    }
}

function getNotes(theLoadFinishedNotes, doAfterFind) {
    db.find({ $where : function() { return theLoadFinishedNotes || !this.finishedDate } }, (err, notes) => {
        if (doAfterFind) {
            doAfterFind(err, notes);
        }
    });
}

function countNotes(theLoadFinishedNotes, doAfterCount) {
    db.find({}, (err, notes) => {
        if (doAfterCount) {
            let noteCounter = new NoteCounter();
            if (notes) {
                noteCounter.countAll = notes.length;
                noteCounter.countFinished = notes.filter((note) => note.finishedDate).length;
                noteCounter.countDisplaying = theLoadFinishedNotes ? noteCounter.countAll : (noteCounter.countAll - noteCounter.countFinished);
            }
            doAfterCount(err, noteCounter);
        }
    });
}

function getNote(theNoteId, doAfterFind) {
    db.findOne({ _id : theNoteId }, (err, note) => {
        if (doAfterFind) {
            doAfterFind(err, note);
        }
    });
}

function insertNote(theNote, doAfterInsert) {
    theNote.creationDate = moment().format('YYYY-MM-DDTHH:mm:ss');
    db.insert(theNote, (err, newDoc) => {
        if (doAfterInsert) {
            doAfterInsert(err, newDoc);
        }
    });
}

function updateNote(theNote, doAfterUpdate) {
    db.update({ _id : theNote._id }, theNote, {}, (err, numAffected) => {
        if (doAfterUpdate) {
            doAfterUpdate(err, numAffected);
        }
    });
}

function deleteNote(theNoteId, doAfterDelete) {
    db.remove({ _id : theNoteId }, {}, (err, numRemoved) => {
        if (doAfterDelete) {
            doAfterDelete(err, numRemoved);
        }
    });
}

function finishNote(theNoteId, doAfterFinish) {
    db.update({ _id : theNoteId }, { $set : { finishedDate : moment().format('YYYY-MM-DDTHH:mm:ss') } }, {}, (err, numAffected) => {
        if (doAfterFinish) {
            doAfterFinish(err, numAffected);
        }
    });
}

function unfinishNote(theNoteId, doAfterUnfinish) {
    db.update({ _id : theNoteId }, { $unset : { finishedDate : true } }, {}, (err, numAffected) => {
        if (doAfterUnfinish) {
            doAfterUnfinish(err, numAffected);
        }
    });
}

module.exports = {
    getNotes,
    countNotes,
    getNote,
    insertNote,
    updateNote,
    deleteNote,
    finishNote,
    unfinishNote
};
