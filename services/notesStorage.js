'use strict';

const moment = require('moment');

const Datastore = require('nedb');
const db = new Datastore({ filename : './data/notes.db', autoload : true });

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
            let countAll = notes.length;
            let countFinished = notes.filter((note) => note.finishedDate).length;
            let countDisplaying = theLoadFinishedNotes ? countAll : (countAll - countFinished);
            doAfterCount(err, { countAll, countFinished, countDisplaying });
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

function saveNote(theNote, doAfterSave) {
    const INVALID_DUEDATE_ERROR_CODE = 'invalid-duedate';
    if (theNote.dueDate) {
        if (!new RegExp('^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$').test(theNote.dueDate)) {
            doAfterSave(INVALID_DUEDATE_ERROR_CODE, 0);
            return;
        }
        else if (!moment(theNote.dueDate).isValid()) {
            doAfterSave(INVALID_DUEDATE_ERROR_CODE, 0);
            return;
        }
    }

    if (theNote._id) {
        db.update({ _id : theNote._id }, theNote, {}, (err, numAffected) => {
            if (doAfterSave) {
                doAfterSave(err, numAffected);
            }
        });
    }
    else {
        theNote.creationDate = moment().format('YYYY-MM-DD');
        db.insert(theNote, (err, newDoc) => {
            if (doAfterSave) {
                doAfterSave(err, newDoc);
            }
        });
    }
}

function deleteNote(theNoteId, doAfterDelete) {
    db.remove({ _id : theNoteId }, {}, (err, numRemoved) => {
        if (doAfterDelete) {
            doAfterDelete(err, numRemoved);
        }
    });
}

function finishNote(theNoteId, doAfterFinish) {
    db.update({ _id : theNoteId }, { $set : { finishedDate : moment().format('YYYY-MM-DD') } }, {}, (err, numAffected) => {
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
    saveNote,
    deleteNote,
    finishNote,
    unfinishNote
};
