'use strict';

const detailView = (function(handlebarsModule) {

    let createNoteModeHtml;
    let createImportanceFieldHtml;

    document.addEventListener('DOMContentLoaded', () => {
        createNoteModeHtml = Handlebars.compile($('#note-mode-template').html());
        createImportanceFieldHtml = Handlebars.compile($('#importance-field-template').html());
    });

    function loadNote(theNote) {
        if (theNote._id) {
            renderSubTitle(true);

            $('#title-field').val(theNote.title);
            $('#description-field').val(theNote.description);
            $('#duedate-field').val(theNote.dueDate);
            setImportance(theNote.importance);

            let creationDateField = $('#creationdate-field');
            creationDateField.html(handlebarsModule.formatDate(theNote.creationDate, 'DD.MM.YYYY / HH:mm:ss'));
            creationDateField.attr('datetime', handlebarsModule.formatDate(theNote.creationDate, 'YYYY-MM-DDTHH:mm:ss'));
            creationDateField.prop('hidden', false);
            $('#creationdate-label').prop('hidden', false);

            if (theNote.finishedDate) {
                let finishedDateField = $('#finisheddate-field');
                finishedDateField.html(handlebarsModule.formatDate(theNote.finishedDate, 'DD.MM.YYYY / HH:mm:ss'));
                finishedDateField.attr('datetime', handlebarsModule.formatDate(theNote.finishedDate, 'YYYY-MM-DDTHH:mm:ss'));
                finishedDateField.prop('hidden', false);
                $('#finisheddate-label').prop('hidden', false);
            }
        }
        else {
            renderSubTitle(false);
        }
    }

    function renderSubTitle(theEditMode) {
        $('#note-mode').html(createNoteModeHtml({ isEditMode : theEditMode }));
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
        renderImportance();
    }

    function renderImportance() {
        let importanceData = [];
        let importance = getImportance();
        for (let index = 1; index <= 5; index++) {
            importanceData.push({selected: index <= importance, importance: index});
        }
        $('#importance-field').html(createImportanceFieldHtml({ importanceData : importanceData }));
    }

    function markInvalidDueDateFields() {
        $('#duedate-field').toggleClass('border--red', true);
        $('#duedate-label').toggleClass('font--red', true);
        $('#duedate-label-invalid').prop('hidden', false);
    }

    return {
        loadNote,
        getTitle,
        getDescription,
        getDueDate,
        getImportance,
        setImportance,
        renderImportance,
        renderSubTitle,
        markInvalidDueDateFields
    };
})(handlebarsModule);