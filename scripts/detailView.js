'use strict';

let detailView = (function(handlebarsModule) {

    function registerHelpers() {
        handlebarsModule.registerHelpers();
    }

    function loadNote(theNote) {
        $('#title-field').val(theNote.title);
        $('#description-field').val(theNote.description);
        $('#importance-field').val(theNote.importance);
        $('#duedate-field').val(theNote.dueDate);
        $('#creationdate-field').val(theNote.creationDate);
        $('#finisheddate-field').val(theNote.finishedDate);
    }

    function renderSubTitle(theEditMode) {
        let createNoteModeHtml = Handlebars.compile($('#note-mode-template').html());
        $('#note-mode').html(createNoteModeHtml({isEditMode: theEditMode}));
    }

    function getTitle() {
        return $('#title-field').val();
    }

    function getDescription() {
        return $('#description-field').val();
    }

    function getDueDate() {
        return $('#duedate-field').val();
    }

    function getImportance() {
        return $('#importance-field').val();
    }

    function setImportance(theImportance) {
        $('#importance-field').val(theImportance);
    }

    function renderImportance() {
        let importanceData = [];
        let importance = getImportance();
        for (let index = 1; index <= 5; index++) {
            importanceData.push({selected: index <= importance, importance: index});
        }
        let createImportanceFieldHtml = Handlebars.compile($('#importance-field-template').html());
        $('#importance-field').html(createImportanceFieldHtml({importanceData: importanceData}));
    }

    function hideImmutableFields() {
        $('#creationdate-label').hide();
        $('#creationdate-field').hide();
        $('#finisheddate-label').hide();
        $('#finisheddate-field').hide();
    }

    function markInvalidFields() {
        $('#duedate-field').toggleClass('border--red', true);
        $('#duedate-label').toggleClass('font--red', true);
        $('#duedate-label-invalid').prop('hidden', false);
    }

    return {
        registerHelpers,
        loadNote,
        renderSubTitle,
        getTitle,
        getDescription,
        getDueDate,
        getImportance,
        setImportance,
        renderImportance,
        hideImmutableFields,
        markInvalidFields
    };
})(handlebarsModule);