//reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes 
//Car class- super simple creating a object with a value and a suit just like a deck of cards
class Card {
    //creating the card
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    //function to get the suit of the card
    getSuit() {
        return this.suit;
    }

    //function to get the value of the card
    getValue() {
        return this.value;
    }

    //function to print the card
    toString() {
        return `${this.value} of ${this.suit}`;
    }
    
}

export { Card };
