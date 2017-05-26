'use strict';

function activateStyle(style) {
    document.getElementById('activestyle').href = style;
}

function setActiveStyle(style) {
    localStorage.setItem('activeStyle', style);
}

function getActiveStyle() {
    let activeStyle = localStorage.getItem('activeStyle');
    if (!activeStyle) {
        localStorage.setItem('activeStyle', 'styles/authors-style.css');
        activeStyle = localStorage.getItem('activeStyle');
    }
    return activeStyle;
}
