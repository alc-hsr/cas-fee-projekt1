'use strict';

let StyleSwitcherModule = (function(settingsModule) {

    // Immediately set active style when loading this module to make sure that the style is loaded as soon as
    // possible to avoid a 'style flickering' when loading the side. Therefore, this file should be loaded
    // in the HTML file before the 'body' tag is loaded.
    activateStyle(settingsModule.getActiveStyle());

    function activateStyle(theStyle) {
        let styleRootElement = document.getElementsByTagName('html')[0];
        if (theStyle === 'author') {
            styleRootElement.classList.remove('hsr');
            styleRootElement.classList.add('author');
        }
        else if (theStyle === 'hsr') {
            styleRootElement.classList.remove('author');
            styleRootElement.classList.add('hsr');
        }
    }

    return {
        activateStyle
    };
})(SettingsModule);
