'use strict';

let detailView = (function() {

    let createNoteModeHtml;
    let createImportanceFieldHtml;

    document.addEventListener('DOMContentLoaded', () => {
        createNoteModeHtml = Handlebars.compile($('#note-mode-template').html());
        createImportanceFieldHtml = Handlebars.compile($('#importance-field-template').html());
    });

    function loadNote(theNote) {
        $('#title-field').val(theNote.title);
        $('#description-field').val(theNote.description);
        $('#importance-field').val(theNote.importance);
        $('#duedate-field').val(theNote.dueDate);
        $('#creationdate-field').val(theNote.creationDate);
        $('#finisheddate-field').val(theNote.finishedDate);
    }

    function renderSubTitle(theEditMode) {
        $('#note-mode').html(createNoteModeHtml({isEditMode: theEditMode}));
    }

    function getTitle() {
        let title = $('#title-field').val();
        return title ? title : undefined;
    }

    function getDescription() {
        let description = $('#description-field').val();
        return description ? description : undefined;
    }

    function getDueDate() {
        let dueDate = $('#duedate-field').val();
        return dueDate ? dueDate : undefined;
    }

    function getImportance() {
        let importance = $('#importance-field').val();
        return importance ? parseInt(importance) : 0;
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
})();