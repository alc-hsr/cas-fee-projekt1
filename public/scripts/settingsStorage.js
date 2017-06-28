'use strict';

const settingsModule = (function() {

    const ACTIVE_STYLE_PROPERTY = 'activeStyle';
    const ACTIVE_SORT_ORDER_PROPERTY = 'activeSortOrder';
    const SHOW_FINISHED_PROPERTY = 'showFinished';

    const DEFAULT_STYLE = 'author';
    const DEFAULT_SORT_ORDER = 'sortoption-duedate';
    const DEFAULT_SHOW_FINISHED = 'true';

    function getActiveOrDefault(theKey, theDefaultValue) {
        let value = localStorage.getItem(theKey);
        if (!value) {
            localStorage.setItem(theKey, theDefaultValue);
            value = localStorage.getItem(theKey);
        }
        return value;
    }

    function setActiveStyle(theStyle) {
        localStorage.setItem(ACTIVE_STYLE_PROPERTY, theStyle);
    }

    function getActiveStyle() {
        return getActiveOrDefault(ACTIVE_STYLE_PROPERTY, DEFAULT_STYLE);
    }

    function setActiveSortOrder(theSortOrder) {
        localStorage.setItem(ACTIVE_SORT_ORDER_PROPERTY, theSortOrder);
    }

    function getActiveSortOrder() {
        return getActiveOrDefault(ACTIVE_SORT_ORDER_PROPERTY, DEFAULT_SORT_ORDER);
    }

    function setShowFinished(theShowFinished) {
        localStorage.setItem(SHOW_FINISHED_PROPERTY, theShowFinished);
    }

    function isShowFinished() {
        return getActiveOrDefault(SHOW_FINISHED_PROPERTY, DEFAULT_SHOW_FINISHED) === 'true';
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
