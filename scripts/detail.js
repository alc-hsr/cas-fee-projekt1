'use strict';

let searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('id')) {
    loadNote(searchParams.get('id'));
}
else {
    $("#createddatelabel").hide();
    $("#createddate").hide();
    $("#finisheddatelabel").hide();
    $("#finisheddate").hide();
}
onImportanceAdjusted();

function onImportanceAdjusted() {
    let template = Handlebars.compile(document.getElementById("importanceitemimagestemplate").innerHTML);
    document.getElementById("importanceitemimages").innerHTML =  template({importance : $("#importanceitem").val()});
}

function loadNote(id) {
    console.log('TODO: Load note with ID ' + id);

    $("#title").val('Das ist der Titel der geladenen Notiz');
    $("#description").val('Das ist die Bezeichnung der geladenen Notiz');
    $("#importanceitem").val('4');
    $("#duedate").val('2017-05-21');
    $("#createddate").val('2000-01-01');
    $("#finisheddate").val('2017-05-01');
}

function cancelDetailPage() {
    window.location.replace('index.html');
}

function saveNote() {
    console.log('TODO: Save note');
    window.location.replace('index.html');
}
