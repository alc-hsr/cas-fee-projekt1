'use strict';

const styleSwitcherModule = (function(settingsModule) {

    const AUTHORS_STYLE = 'author';
    const HSR_STYLE = 'hsr';

    // Set active style immediately when loading this module to make sure that the style is loaded as soon as
    // possible to avoid a 'style flickering' when loading the site. Therefore, this file should be loaded
    // in the HTML file before the 'body' tag is loaded.
    activateStyle(settingsModule.getActiveStyle());

    function activateStyle(theStyle) {
        let styleRootElement = document.getElementsByTagName('html')[0];
        if (theStyle === AUTHORS_STYLE) {
            styleRootElement.classList.remove(HSR_STYLE);
            styleRootElement.classList.add(AUTHORS_STYLE);
        }
        else if (theStyle === HSR_STYLE) {
            styleRootElement.classList.remove(AUTHORS_STYLE);
            styleRootElement.classList.add(HSR_STYLE);
        }
    }

    return {
        activateStyle
    };
})(settingsModule);
