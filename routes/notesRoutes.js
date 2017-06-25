'use strict';

const router = require('express').Router();
const notes = require('../controller/notesController');

router.get('/notes', notes.getNotes);
router.post('/notes', notes.saveNote);

router.get('/notes/count', notes.countNotes);

router.post('/notes/finish/:id', notes.finishNote);
router.post('/notes/unfinish/:id', notes.unfinishNote);

router.get('/notes/:id', notes.getNote);
router.delete('/notes/:id', notes.deleteNote);

module.exports = router;
