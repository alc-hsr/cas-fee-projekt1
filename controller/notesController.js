'use strict';

const notes = require('../services/notesStorage');

function getNotes(req, res) {
    res.json(notes.getNotes(req.query.loadFinishedNotes !== 'false'));
}

function getNote(req, res) {
    let noteId = req.params.id;
    if (noteId) {
        res.json({note: notes.getNote(noteId)});
    }
    else {
        res.status(400).end();
    }
}

function saveNote(req, res) {
    let note = req.body.note;
    if (note) {
        let errorMessageCode = notes.saveNote(note);
        if (errorMessageCode) {
            res.status(400).send(errorMessageCode);
        }
        else {
            res.status(204).end();
        }
    }
    else {
        res.status(400).send('No data provided to save');
    }
}

function deleteNote(req, res) {
    let noteId = req.params.id;
    if (noteId) {
        notes.deleteNote(noteId);
        res.status(204).end();
    }
    else {
        res.status(400).end();
    }
}

module.exports = {
    getNotes,
    getNote,
    saveNote,
    deleteNote
};
