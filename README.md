# presumedevice.js
It's true, you can't detect touch or mouse devices. But you can make assumptions.

## About
This is a tiny* JavaScript utility that tries to presume whatever the user is interacting with a touch and/or a mouse device.

By now, we all know that we can't (still) truly detect touch devices. **Why make assumptions, then?** As designers, most of us love to fine tune little details of our work, this utility can help us with those non-critical but equally-important UI improvements.

*: ~480B when compressed and gzipped.

## Quick Demo

[https://pinoceniccola.github.io/presumedevice.js/](https://pinoceniccola.github.io/presumedevice.js/)

## Usage

Install & require via npm:
```
npm i presumedevice-js
...
require('presumedevice-js');
```
Or include the script the old-fashioned way:
```
<script src="https://unpkg.com/presumedevice-js/presumedevice.min.js"></script>
```
The utility does **two simple things**:

1) Adds two `CSS` classes to the `HTML` element:
- `presume-touch` OR `presume-no-touch` AND 
- `presume-mouse` OR `presume-no-mouse`

 2) Fires a `Custom Event` that you can listen with:
````
window.addEventListener('onPresumeDevice', function(e){
    console.log(e.detail); // -> {presumeTouch : bool, presumeMouse: bool}
});
````

## Use responsibly + Caveats
You should always design with both touch and mouse in mind. Also, always remember that `Touch != Mobile Device`, there are many different scenarios and the user can have **both** touch and a mouse.

Please, also consider that:
- You can't always presume everything on runtime, since this library waits for the very first user action. This means probabily a few milliseconds (mouse devices) or as long as users first touch their screens. 
- Users with both mouse and touch capabilities (think laptops with touch screens) can switch anytime between mouse or touch. This library makes assumptions only on the very first action taken by the user.
- According [this table](https://patrickhlauke.github.io/touch/tests/results/#mobile-tablet-touchscreen-events), some third-party browsers for Android fire mouse events before touch events and this could lead to wrong assumptions and side effects.

