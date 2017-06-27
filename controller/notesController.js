'use strict';

const moment = require('moment');
const notes = require('../services/notesStorage');

function getNotes(req, res) {
    let loadFinishedNotes = req.query.loadFinishedNotes !== 'false';
    notes.getNotes(loadFinishedNotes, (err, notes) => {
        res.json({ notes : notes || [] });
    });
}

function countNotes(req, res) {
    let loadFinishedNotes = req.query.loadFinishedNotes !== 'false';
    notes.countNotes(loadFinishedNotes, (err, noteCounter) => {
        res.json({ noteCounter : noteCounter });
    });
}

function getNote(req, res) {
    let noteId = req.params.id;
    if (noteId) {
        notes.getNote(noteId, (err, note) => {
            if (note) {
                res.json({ note : note });
            }
            else {
                res.status(404);
                res.send('Note not found with ID: ' + noteId);
            }
        });
    }
    else {
        res.status(400);
        res.send('No ID provided to retrieve a note');
    }
}

function insertNote(req, res) {
    let note = req.body.note;
    if (note) {
        let errorMessage = checkDueDate(note);
        if (errorMessage) {
            res.status(400);
            res.send(errorMessage);
            return;
        }
        notes.insertNote(note, (err, newDoc) => {
            res.json({ note : newDoc });
        });
    }
    else {
        res.status(400);
        res.send('No data provided to insert');
    }
}

function updateNote(req, res) {
    let note = req.body.note;
    if (note) {
        let errorMessage = checkDueDate(note);
        if (errorMessage) {
            res.status(400);
            res.send(errorMessage);
            return;
        }
        notes.updateNote(note, (err, numAffected) => {
            res.json({ note : note });
        });
    }
    else {
        res.status(400);
        res.send('No data provided to update');
    }
}

function deleteNote(req, res) {
    let noteId = req.params.id;
    if (noteId) {
        notes.deleteNote(noteId, (err, numRemoved) => {
            res.status(204);
            res.end();
        });
    }
    else {
        res.status(400);
        res.send('No ID provided to delete a note');
    }
}

function finishNote(req, res) {
    let noteId = req.params.id;
    if (noteId) {
        notes.finishNote(noteId, (err, numAffected) => {
            res.status(204);
            res.end();
        });
    }
    else {
        res.status(400);
        res.send('No ID provided to finish a note');
    }
}

function unfinishNote(req, res) {
    let noteId = req.params.id;
    if (noteId) {
        notes.unfinishNote(noteId, (err, numAffected) => {
            res.status(204);
            res.end();
        });
    }
    else {
        res.status(400);
        res.send('No ID provided to unfinish a note');
    }
}

function checkDueDate(theNote) {
    const INVALID_DUEDATE_ERROR_CODE = 'invalid-duedate';
    if (theNote.dueDate) {
        if (!new RegExp('^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$').test(theNote.dueDate)) {
            return INVALID_DUEDATE_ERROR_CODE;
        }
        else if (!moment(theNote.dueDate).isValid()) {
            return INVALID_DUEDATE_ERROR_CODE;
        }
    }
    return undefined;
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
