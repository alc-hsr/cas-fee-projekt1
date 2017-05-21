'use strict';

Handlebars.registerHelper('importanceHelper', function(importance, showDeselected) {
    let result = '';
    let index = 0;
    let maxImportance = 5;
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
