'use strict';

(function() {

    document.addEventListener('DOMContentLoaded', () => {
        /*
         * 'importanceHelper' is responsible to print as many star images as the 'importance'
         * of the note is.
         */
        Handlebars.registerHelper('importanceHelper', (importance) => {
            let resultHtmlText = '';
            for (let index = 0; index < importance; index++) {
                resultHtmlText += '<img src="images/important_selected_16.png">';
            }
            return resultHtmlText;
        });

        /*
         * 'formatDateHelper' is responsible format the given date with the given format.
         * If there is no date given, an emtpy text is returned.
         */
        Handlebars.registerHelper('formatDateHelper', (date, pattern) => {
            if (!date) {
                return '';
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
    });
})();
