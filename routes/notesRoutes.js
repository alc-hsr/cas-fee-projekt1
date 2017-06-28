'use strict';

const router = require('express').Router();
const notes = require('../controller/notesController');

router.get('/notes', notes.getNotes);
router.post('/notes', notes.insertNote);

router.get('/notes/count', notes.countNotes);

router.put('/notes/:id', notes.updateNote);
router.put('/notes/:id/finish', notes.finishNote);
router.put('/notes/:id/unfinish', notes.unfinishNote);

router.get('/notes/:id', notes.getNote);
router.delete('/notes/:id', notes.deleteNote);

module.exports = router;
