'use strict';

(function() {
    /*
     * 'importanceHelper' is responsible to print as many star images as the 'importance'
     * is. If 'showDeselected' is true, then it will print deselected stars to fulfill a
     * row of 5 stars.
     */
    Handlebars.registerHelper('importanceHelper', (importance, showDeselected) => {
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

    /*
     * 'formatDateHelper' is responsible format the given date with the given format.
     * If there is no date given, 'Anytime' will be returned.
     */
    Handlebars.registerHelper('formatDateHelper', (date, pattern) => {
        if (!date) {
            return 'Anytime';
        }
        if (moment) {
            return moment(date).format(pattern);
        }
        else {
            return date;
        }
    });

    /*
     * 'relativeDateHelper' is responsible to print a text which represents the given
     * date relative to today. If the date is today, then 'today' will be returned.
     */
    Handlebars.registerHelper('relativeDateHelper', (date) => {
        if (!date) {
            return '';
        }
        if (moment) {
            if (moment(date).isSame(moment(), 'd')) {
                return 'today';
            }
            return moment(date).from(moment().startOf('day'));
        }
        else {
            return date;
        }
    });
})();
