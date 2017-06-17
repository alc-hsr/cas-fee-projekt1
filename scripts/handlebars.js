'use strict';

(function() {

    document.addEventListener('DOMContentLoaded', () => {
        /*
         * 'importanceHelper' is responsible to print as many star images as the 'importance'
         * of the note is.
         */
        Handlebars.registerHelper('importanceHelper', (theImportance) => {
            let resultHtmlText = '';
            for (let index = 0; index < theImportance; index++) {
                resultHtmlText += '<img src="images/important_selected_16.png">';
            }
            return resultHtmlText;
        });

        /*
         * 'formatDateHelper' is responsible format the given date with the given format.
         * If there is no date given, an emtpy text is returned.
         */
        Handlebars.registerHelper('formatDateHelper', (theDate, thePattern) => {
            if (!theDate) {
                return '';
            }
            if (moment) {
                return moment(theDate).format(thePattern);
            }
            else {
                return theDate;
            }
        });

        /*
         * 'relativeDateHelper' is responsible to print a text which represents the given
         * date relative to today. If the date is today, then 'today' will be returned.
         */
        Handlebars.registerHelper('relativeDateHelper', (theDate) => {
            if (!theDate) {
                return '';
            }
            if (moment) {
                if (moment(theDate).isSame(moment(), 'd')) {
                    return 'today';
                }
                return moment(theDate).from(moment().startOf('day'));
            }
            else {
                return theDate;
            }
        });
    });
})();
