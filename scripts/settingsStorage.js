'use strict';

let SettingsModule = (function() {

    const ACTIVE_STYLE = 'activeStyle';
    const ACTIVE_SORT_ORDER = 'activeSortOrder';
    const SHOW_FINISHED = 'showFinished';

    function getActiveOrDefault(theKey, theDefaultValue) {
        let value = localStorage.getItem(theKey);
        if (!value) {
            localStorage.setItem(theKey, theDefaultValue);
            value = localStorage.getItem(theKey);
        }
        return value;
    }

    function setActiveStyle(theStyle) {
        localStorage.setItem(ACTIVE_STYLE, theStyle);
    }

    function getActiveStyle() {
        return getActiveOrDefault(ACTIVE_STYLE, 'author');
    }

    function setActiveSortOrder(theSortOrder) {
        localStorage.setItem(ACTIVE_SORT_ORDER, theSortOrder);
    }

    function getActiveSortOrder() {
        return getActiveOrDefault(ACTIVE_SORT_ORDER, 'sortByDueDate');
    }

    function setShowFinished(theShowFinished) {
        localStorage.setItem(SHOW_FINISHED, theShowFinished);
    }

    function isShowFinished() {
        return (getActiveOrDefault(SHOW_FINISHED, true) == 'true');
    }

    return {
        setActiveStyle,
        getActiveStyle,
        setActiveSortOrder,
        getActiveSortOrder,
        setShowFinished,
        isShowFinished
    };
})();
