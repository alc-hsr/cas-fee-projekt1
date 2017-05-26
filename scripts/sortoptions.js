'use strict';

function setActiveSortOrder(sortOrder) {
    localStorage.setItem('activeSortOrder', sortOrder);
}

function getActiveSortOrder() {
    let activeStyle = localStorage.getItem('activeSortOrder');
    if (!activeStyle) {
        localStorage.setItem('activeSortOrder', 'sortByDueDate');
        activeStyle = localStorage.getItem('activeSortOrder');
    }
    return activeStyle;
}
