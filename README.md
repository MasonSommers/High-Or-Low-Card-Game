# High or Low Card Game

## Brief Description

High or Low is an interactive card prediction game where players bet on whether the next card drawn will be higher, lower, or the same value as the current card. Players start with $100 and can place bets, with odds dynamically calculated based on the remaining cards in the deck. The player can choose to keep going gaining more money as they guess more cards correctly or cashingout. The player keeps their balance and can make new bets off their winnings.

## What "New Thing" I Learned

ES6 Modules and Module Scope: I learned how to properly structure JavaScript code using ES6 modules with `import`/`export` statements. This was particularly challenging when trying to make functions globally accessible from HTML event handlers, which required using `window.functionName = functionName` to expose module functions to the global scope. As we have done in the past we have not implemented any classes where creating a modlue was not needed because it was all in one script. Working with es6 Modules helped me better understand how to scope js files and structure them.
 
Popup Celebrations: I learned how to replace basic JavaScript alerts with more engaging visual celebrations using libraries like SweetAlert2 and Canvas Confetti. This allowed me to create dynamic popup notifications and confetti animations that enhance the user experience. One challenge I faced was integrating these effects directly within a JavaScript file rather than through HTML, which required dynamically loading the libraries and calling their functions from script logic. Through this, I learned how to use third-party libraries effectively, manage asynchronous loading, and make my web applications feel more interactive and polished.



## Challenges Faced

A lot of the challenges I faced had to do with the learning of the new popup celebrations and ES6 Modules since these were new topics it was hard to understand them at first. Otherwise most of my other problems came from the css and html bootstrap just because I find it tedious and annoying at times to make small changes. Developing the core JS logic went smoothly having references like the wordle JS script.

## AI Usage Documentation

ChatGPT: 
- Debugging JavaScript errors and module import issues - Es6 Modules
- CSS styling assistance and Bootstrap integration - Exspeically with the three main game cards
- Popup Celebration guide - Helped understand documentation and provided starter code for popup functions


## AI Reflection

AI assistance worked exceptionally well for debugging complex issues like ES6 module scope problems and CSS specificity conflicts. The AI was particularly helpful in explaining why certain approaches weren't working and suggesting alternative solutions. However, there were instances where the AI suggested overly complex solutions when simpler approaches would have sufficed, particularly with CSS styling where sometimes basic Bootstrap classes were more appropriate than custom CSS rules.

