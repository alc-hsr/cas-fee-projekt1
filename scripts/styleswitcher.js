'use strict';

(function() {
    activateStyle(getActiveStyle());
})();

function activateStyle(style) {
    let styleRootElement = document.getElementsByTagName('html')[0];
    if (style === 'author') {
        styleRootElement.classList.remove('hsr');
        styleRootElement.classList.add('author');
    }
    else if (style === 'hsr') {
        styleRootElement.classList.remove('author');
        styleRootElement.classList.add('hsr');
    }
}

function setActiveStyle(style) {
    localStorage.setItem('activeStyle', style);
}

function getActiveStyle() {
    let activeStyle = localStorage.getItem('activeStyle');
    if (!activeStyle) {
        localStorage.setItem('activeStyle', 'author');
        activeStyle = localStorage.getItem('activeStyle');
    }
    return activeStyle;
}
