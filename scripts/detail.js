function onImportanceAdjusted() {
    var template = Handlebars.compile(document.getElementById("importanceitemimagestemplate").innerHTML);
    document.getElementById("importanceitemimages").innerHTML =  template({importance : $("#importanceitem").val()});
}
