//Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
//Deck class - creating a deck of cards with card objects
import { Card } from './cards.js';

class Deck {
   
    //creating the deck by looping through the suits and values and creating a card object for each combination
    constructor() {

        let suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "1"];
        this.cards = [];
        for(let x = 0; x < suits.length; x++) {
            for(let y = 0; y < values.length; y++) {
                this.cards.push(new Card(values[y], suits[x]));
            }
        }
    }

    //function to get the cards in the deck
    getCards() {
        return this.cards;
    }

    //function to shuffle the deck
    shuffle() {
        //gets the length of the deck and loops through it random swapping the index its at with another random index
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    //function to draw a card from the deck
    drawCard() {
        return this.cards.pop();
    }

    //function to get the size of the deck
    getSize() {
        return this.cards.length;
    }
}

export { Deck };