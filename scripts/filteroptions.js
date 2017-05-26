'use strict';

function setShowFinished(showFinished) {
    localStorage.setItem('showFinished', showFinished);
}

function isShowFinishedEnabled() {
    let isShowFinishedEnabled = localStorage.getItem('showFinished');
    if (!isShowFinishedEnabled) {
        localStorage.setItem('showFinished', true);
        isShowFinishedEnabled = localStorage.getItem('showFinished');
    }
    return (isShowFinishedEnabled == 'true');
}
