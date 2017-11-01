/*! presumedevice.js | (c) Pino Ceniccola | https://github.com/pinoceniccola/presumedevice.js */

(function (window,document) {

var touchEvents = 'ontouchstart' in window,
    presumeTouch = touchEvents || navigator.maxTouchPoints,
    presumeMouse,
    htmlEl = document.documentElement,
    dispatchPresumeEvent = function() {
        var details = { 'presumeTouch': !!presumeTouch, 'presumeMouse': !!presumeMouse };
        if ( typeof window.CustomEvent === "function" ) {
            var _event = new CustomEvent('onPresumeDevice', {detail: details});
        } else { // compat for IE
            var _event = document.createEvent('CustomEvent');
            _event.initCustomEvent('onPresumeDevice', false, false, details );
        }
        window.dispatchEvent(_event);
    };

if (!presumeTouch) {

    // No touch events detected, presume mouse as a default fallback
    presumeMouse = true;
    htmlEl.classList.add('presume-no-touch');
    htmlEl.classList.add('presume-mouse');
    window.addEventListener('DOMContentLoaded', dispatchPresumeEvent);

} else {

    // 1. Touch events detected, presume touch
    htmlEl.classList.add('presume-touch');

    // 2. Waiting for user behavior
    //
    // Rationale: Now we are waiting for the very first user action. Mouse devices
    // (also touch screen laptops) always fire a mouse event FIRST. Touch devices (which also fire
    // mouse events for compatibility) usually FIRST fire a touch event before the mouse one.
    // On that assumption we presume if the user is interacting with a mouse or a touch device.

    addRemoveEvents(true);

    function onFirstAction(e) {
        addRemoveEvents(false);

        if ( e.type === 'touchstart' || ( e.pointerType === "touch" /*&& e.isPrimary === true*/ ) ) {
            // Touch event first, presume no mouse
            htmlEl.classList.add('presume-no-mouse');
        } else {
            // Mouse event first, presume mouse
            presumeMouse = true;
            htmlEl.classList.add('presume-mouse');
        }

        dispatchPresumeEvent();
    }

    function addRemoveEvents(add) {
        if (add) {
            window.addEventListener('mouseover', onFirstAction, false);
            window.addEventListener('wheel', onFirstAction, {passive: true});
            if (touchEvents) {
                window.addEventListener('touchstart', onFirstAction, {passive: true});
            } else {
                window.addEventListener('pointerdown', onFirstAction, false); 
            }
        } else {
            window.removeEventListener('mouseover', onFirstAction, false);
            window.removeEventListener('wheel', onFirstAction, {passive: true});
            window.removeEventListener('touchstart', onFirstAction, {passive: true});
            window.removeEventListener('pointerdown', onFirstAction, false);
        }
    }
}


})(window,document);


/*
window.addEventListener('onPresumeDevice', function(e){
    console.log(e.detail); // -> {presumeTouch : bool, presumeMouse: bool}
});
*/