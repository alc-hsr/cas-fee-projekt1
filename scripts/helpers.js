Handlebars.registerHelper('importanceHelper', function(importance, showDeselected) {
    var result = '';
    var index = 0;
    var maxImportance = 5;
    for (; index < importance; index++) {
        result += '<img src="images/important.png">';
    }
    if (showDeselected) {
        for (; index < maxImportance; index++) {
            result += '<img src="images/important_deselected.png">';
        }
    }
    return result;
});
