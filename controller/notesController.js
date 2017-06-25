'use strict';

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
        res.json({ noteCounter : noteCounter || [] });
    });
}

function getNote(req, res) {
    let noteId = req.params.id;
    if (noteId) {
        notes.getNote(noteId, (err, note) => {
            res.json({ note : note });
        });
    }
    else {
        res.status(400).end();
    }
}

function saveNote(req, res) {
    let note = req.body.note;
    if (note) {
        notes.saveNote(note, (error) => {
            if (error) {
                res.status(400).send(error);
            }
            else {
                res.status(204).end();
            }
        });
    }
    else {
        res.status(400).send('No data provided to save');
    }
}

function deleteNote(req, res) {
    let noteId = req.params.id;
    if (noteId) {
        notes.deleteNote(noteId, () => {
            res.status(204).end();
        });
    }
    else {
        res.status(400).end();
    }
}

function finishNote(req, res) {
    let noteId = req.params.id;
    if (noteId) {
        notes.finishNote(noteId, () => {
            res.status(204).end();
        });
    }
    else {
        res.status(400).end();
    }
}

function unfinishNote(req, res) {
    let noteId = req.params.id;
    if (noteId) {
        notes.unfinishNote(noteId, () => {
            res.status(204).end();
        });
    }
    else {
        res.status(400).end();
    }
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
