# Telescopic

A tiny library that helps you visually call out elements on a page.

## Usage

```
const telescopic = new Telescopic();

// Adds dark overlay over entire page
telescopic.addBackdrop();

// Adds highlight frame for target DOM element
const myElement = document.querySelector('#important-thing');
telescopic.focus(myElement);

// Removes highlight frame
telescopic.unfocus();

// Removes backdrop
telescopic.removeBackdrop();

// Recalculate the position of the targeted element and re-draws frame
// Useful when page width or dimentions of the highlighted element change
telescopic.refresh();

// Remove any trace of telescopic's UI
telescopic.clear();
```
