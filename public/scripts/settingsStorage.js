'use strict';

const settingsModule = (function() {

    const ACTIVE_STYLE_PROPERTY_NAME = 'activeStyle';
    const ACTIVE_SORT_ORDER_PROPERTY_NAME = 'activeSortOrder';
    const SHOW_FINISHED_PROPERTY_NAME = 'showFinished';
    const AUTO_REFRESH_PROPERTY_NAME = 'autoRefresh';

    const DEFAULT_STYLE_VALUE = 'author';
    const DEFAULT_SORT_ORDER_VALUE = 'sortoption-duedate';
    const DEFAULT_SHOW_FINISHED_VALUE = 'true';
    const DEFAULT_AUTO_REFRESH_VALUE = 'false';

    function getActiveOrDefault(theKey, theDefaultValue) {
        let value = localStorage.getItem(theKey);
        if (!value) {
            localStorage.setItem(theKey, theDefaultValue);
            value = localStorage.getItem(theKey);
        }
        return value;
    }

    function setActiveStyle(theStyle) {
        localStorage.setItem(ACTIVE_STYLE_PROPERTY_NAME, theStyle);
    }

    function getActiveStyle() {
        return getActiveOrDefault(ACTIVE_STYLE_PROPERTY_NAME, DEFAULT_STYLE_VALUE);
    }

    function setActiveSortOrder(theSortOrder) {
        localStorage.setItem(ACTIVE_SORT_ORDER_PROPERTY_NAME, theSortOrder);
    }

    function getActiveSortOrder() {
        return getActiveOrDefault(ACTIVE_SORT_ORDER_PROPERTY_NAME, DEFAULT_SORT_ORDER_VALUE);
    }

    function setShowFinished(theShowFinished) {
        localStorage.setItem(SHOW_FINISHED_PROPERTY_NAME, theShowFinished);
    }

    function isShowFinished() {
        return getActiveOrDefault(SHOW_FINISHED_PROPERTY_NAME, DEFAULT_SHOW_FINISHED_VALUE) === 'true';
    }

    function setAutoRefresh(theAutoRefresh) {
        localStorage.setItem(AUTO_REFRESH_PROPERTY_NAME, theAutoRefresh);
    }

    function isAutoRefresh() {
        return getActiveOrDefault(AUTO_REFRESH_PROPERTY_NAME, DEFAULT_AUTO_REFRESH_VALUE) === 'true';
    }

    return {
        setActiveStyle,
        getActiveStyle,
        setActiveSortOrder,
        getActiveSortOrder,
        setShowFinished,
        isShowFinished,
        setAutoRefresh,
        isAutoRefresh
    };
})();
