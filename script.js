//IMPORT A DECK OF CARDS
import { Deck } from './deck.js';
import { Card } from './cards.js';


//GAME START VARIABLES
let balance = 100;
let betAmount = 0;
let deck, FirstCard, previousCard, cardDrawn;
let GameStarted = false;
let leftCard, centerCardTitle, rightCard, centerCard, leftCardTitle, rightCardTitle, leftCardText, centerCardText, rightCardText, highButton, lowButton, currentBet, debugOutput, sameButton, balanceElement, cashoutAmount, highButtonReal, lowButtonReal, sameButtonReal, placeBet;
let potentialWinningsHighGlobal, potentialWinningsLowGlobal, potentialWinningsSameGlobal;


// Initialize when page loads
//initialize the game board, rows, debug output, and balance so they can be used in the script
document.addEventListener('DOMContentLoaded', function() {
    leftCard = document.getElementById('left-card');
    centerCard = document.getElementById('center-card');
    rightCard = document.getElementById('right-card');
    leftCardTitle = document.getElementById('left-card-title');
    centerCardTitle = document.getElementById('center-card-title');
    rightCardTitle = document.getElementById('right-card-title');
    leftCardText = document.getElementById('left-card-text');
    centerCardText = document.getElementById('center-card-text');
    rightCardText = document.getElementById('right-card-text');
    balanceElement = document.getElementById('balance');
    highButton = document.getElementById('high-info');
    lowButton = document.getElementById('low-info');
    betAmount = document.getElementById('bet-amount');
    currentBet = document.getElementById('current-bet');
    debugOutput = document.getElementById('debug-output');
    sameButton = document.getElementById('same-info');
    cashoutAmount = document.getElementById('cash-out');
    highButtonReal = document.getElementById('high-button');
    lowButtonReal = document.getElementById('low-button');
    sameButtonReal = document.getElementById('same-button');
    placeBet = document.getElementById('place-bet');
    // Set default images immediately
    leftCard.src = 'Images/purple_back.png';
    centerCard.src = 'Images/purple_back.png';
    rightCard.src = 'Images/purple_back.png';
    balanceElement.textContent = `Balance: $${balance}`;
    

    
    
});

//Bet management functions
//adds the amount to the bet amount
function addBet(amount) {
    let currentValue = parseInt(betAmount.value) || 0;
    console.log("Adding bet of $" + amount);
    console.log("Current bet amount: $" + betAmount.value);
    currentValue += amount;
    betAmount.value = currentValue;
   
}

//sets the bet amount to the balance
function setMaxBet() {
    betAmount.value = balance;
}

//resets the game and all  the variables needed
function resetGame(){
    potentialWinningsHighGlobal = 0;
    potentialWinningsLowGlobal = 0;
    potentialWinningsSameGlobal = 0;
    balance = 100;
    balanceElement.textContent = `Balance: $${balance}`;
    betAmount.value = 0;
    cashoutAmount.textContent = "Cash Out: $" + betAmount.value;
    highButton.textContent = "Win: $0 | Odds: 0.00";
    lowButton.textContent = "Win: $0 | Odds: 0.00";
    sameButton.textContent = "Win: $0 | Odds: 0.00";
    GameStarted = false;
    leftCard.src = 'Images/purple_back.png';
    centerCard.src = 'Images/purple_back.png';
    rightCard.src = 'Images/purple_back.png';
    leftCardTitle.textContent = "Previous Card";
    centerCardTitle.textContent = "Current Card";
    rightCardTitle.textContent = "Next Card!";
    leftCardText.textContent = "Previous Card";
    placeBet.disabled = false;
}
//starts the game and draws the first card and displays it
function startGame() {
    placeBet.disabled = true;
    if (balance < betAmount.value || betAmount.value <= 0) {
        notEnoughMoneyAlert();
        return;
        placeBet.disabled = false;
    }
    //creating a new deck and shuffling it
    deck = new Deck();
    deck.shuffle();
    console.log("Deck shuffled");

    //drawing the first card
    FirstCard = deck.drawCard();
    previousCard = FirstCard;
    leftCard.src = 'Images/purple_back.png';

    //displaying the first card
    centerCard.src = getImageForCard(FirstCard);
    centerCardTitle.textContent = "Current Card: " + FirstCard.toString();
    console.log("Image for first card: " + getImageForCard(FirstCard));
    console.log("First card drawn: " + FirstCard.toString() +"Displayed ");
    GameStarted = true;

    //calculating the odds
    cashoutAmount.textContent = "Cash Out: $" + betAmount.value;
    balance -= betAmount.value;
    balanceElement.textContent = `Balance: $${balance}`;
    let odds = calculateOdds(FirstCard);
    console.log("Odds: " + odds.highOdds);
    let potentialWinningsValues = potentialWinnings(odds.highOdds, odds.lowOdds, odds.sameOdds);
    console.log("Potential winnings high: " + potentialWinningsValues.potentialWinningsHigh);
    console.log("Potential winnings low: " + potentialWinningsValues.potentialWinningsLow);
    console.log("Potential winnings same: " + potentialWinningsValues.potentialWinningsSame);
    console.log("Odds: " + odds.highOdds + " " + odds.lowOdds + " " + odds.sameOdds);
    potentialWinningsHighGlobal = potentialWinningsValues.potentialWinningsHigh;
    potentialWinningsLowGlobal = potentialWinningsValues.potentialWinningsLow;
    potentialWinningsSameGlobal = potentialWinningsValues.potentialWinningsSame;
    //displaying the potential winnings and odds
    //I want to display the potential winnings and odds under each coressponding button
    highButton.textContent = "Win: " + potentialWinningsValues.potentialWinningsHigh + " Odds: " + odds.highOdds+"X";
    lowButton.textContent = "Win: " + potentialWinningsValues.potentialWinningsLow + " Odds: " + odds.lowOdds+"X";
    sameButton.textContent = "Win: " + potentialWinningsValues.potentialWinningsSame + " Odds: " + odds.sameOdds+"X";
    checkOdds();
}


//creates a confetti burst and a popup when the user wins
function celebrateWin() {
    // Fire confetti burst
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
    });
  
    // Show popup
    Swal.fire({
      title: "🎉 You Win!",
      text: "Amazing job!",
      icon: "success",
      background: "#121212",
      color: "#fff",
      showConfirmButton: false,
      timer: 1800,
    });
  }

//creates a confetti burst and a popup when the user loses
function celebrateLoss() {
    Swal.fire({
      title: "😞 You Lost!",
      text: "Better luck next time!",
      icon: "error",
      background: "#1b1b1b",
      color: "#ffbaba",
      showConfirmButton: false,
      timer: 1800,
    });
  
    // Optional: gray “falling ashes” effect
    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "9999",
    });
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
  
    const ashes = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -50,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
    }));
  
    function drawAshes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(128,128,128,0.5)";
      ashes.forEach(a => {
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fill();
        a.y += a.speed;
        if (a.y > window.innerHeight) a.y = Math.random() * -50;
      });
      requestAnimationFrame(drawAshes);
    }
    drawAshes();
  
    setTimeout(() => canvas.remove(), 2000);
  }
  

// Deck Empty Alert
function deckEmptyAlert() {
    Swal.fire({
      title: "🃏 Deck is Empty!",
      text: "There are no more cards left to draw.",
      icon: "warning",
      background: "#1b1b1b",
      color: "#fff",
      confirmButtonColor: "#d33",
      confirmButtonText: "OK"
    });
  }
  
  // Not Enough Money Alert
  function notEnoughMoneyAlert() {
    Swal.fire({
      title: "💸 Not Enough Money!",
      text: "You don’t have enough funds to place this bet.",
      icon: "error",
      background: "#1b1b1b",
      color: "#fff",
      confirmButtonColor: "#d33",
      confirmButtonText: "Got it"
    });
  }
  
  // Start Game First Alert
  function startGameFirstAlert() {
    Swal.fire({
      title: "⚠️ Start the Game First!",
      text: "Please start the game before performing this action.",
      icon: "info",
      background: "#1b1b1b",
      color: "#fff",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK"
    });
  }
  

//calculates the odds of the next card being higher, lower, or the same as the previous card
function calculateOdds(card){
    //declaring the variables
    let highOdds = 0;
    let lowOdds = 0;
    let sameOdds = 0;
    let highCounter = 0;
    let lowCounter = 0;
    let sameCounter = 0;
    let length = deck.getSize();
    console.log("Length: " + length);
    let cardValue = parseInt(card.getValue());
    console.log("Card value: " + cardValue);
    let CurrentDeck = deck.getCards();
    console.log("Current Deck: " + CurrentDeck);
    //looping through the deck and counting the number of cards that are higher, lower, and the same
    for(let i = 0; i < length; i++){
        let currentCard = CurrentDeck[i];
        let currentCardValue = parseInt(currentCard.getValue());
        console.log("Current card value: " + currentCardValue);
        console.log("Card value: " + cardValue);
        if(currentCardValue > cardValue){
            highCounter++;
        } else if(currentCardValue < cardValue){
            lowCounter++;
        } else if(currentCardValue === cardValue){
            sameCounter++;
        }
    }
    console.log("High counter: " + highCounter);
    console.log("Low counter: " + lowCounter);
    console.log("Same counter: " + sameCounter);
    //calculating the odds
    highOdds = 1/(highCounter / length);
    lowOdds = 1/(lowCounter / length);
    sameOdds = 1/(sameCounter / length);
    highOdds = highOdds.toFixed(2);
    lowOdds = lowOdds.toFixed(2);
    sameOdds = sameOdds.toFixed(2);
    //displaying the odds
    console.log("High odds: " + highOdds);
    console.log("Low odds: " + lowOdds);
    console.log("Same odds: " + sameOdds);
    let odds = {highOdds, lowOdds, sameOdds};
    return odds;
}

//calculates the potential winnings of the next card being higher, lower, or the same as the previous card based on the odds
function potentialWinnings(highOdds, lowOdds, sameOdds){
    let potentialWinningsHigh, potentialWinningsLow, potentialWinningsSame = 0;
    potentialWinningsHigh = highOdds * betAmount.value;
    potentialWinningsLow = lowOdds * betAmount.value;
    potentialWinningsSame = sameOdds * betAmount.value;
    potentialWinningsHigh = potentialWinningsHigh.toFixed(2);
    potentialWinningsLow = potentialWinningsLow.toFixed(2);
    potentialWinningsSame = potentialWinningsSame.toFixed(2);
    let winnings = {potentialWinningsHigh, potentialWinningsLow, potentialWinningsSame};
    console.log("highodds: " + highOdds + "Times bet amount: " + betAmount.value + "= " + potentialWinningsHigh);
    console.log("lowodds: " + lowOdds + "Times bet amount: " + betAmount.value + "= " + potentialWinningsLow);
    console.log("sameodds: " + sameOdds + "Times bet amount: " + betAmount.value + "= " + potentialWinningsSame);
    return winnings;
    

    
}

//the function that is called when the high button is clicked
function highButtonFunction() {
    console.log("High button clicked");
    //checking if the game has started
    if(gameCheck() == false){
        startGameFirstAlert();
        console.log("Game not started!");
        return;
    }

    //drawing a new card
    console.log("High button clicked");
    let previousCardValue = parseInt(previousCard.getValue()); // Compare to the PREVIOUS card
    cardDrawn = deck.drawCard();
    let nextCardDrawnValue = parseInt(cardDrawn.getValue());
    console.log("Next card drawn value: " + nextCardDrawnValue);
    console.log("Previous card value: " + previousCardValue);

    //displaying the new card
    console.log("Displaying new card");
    centerCard.src = getImageForCard(cardDrawn);
    centerCardTitle.textContent = "Current Card: " + cardDrawn.toString();

    //change left card to the old card
    console.log("Changing left card to previous card");
    leftCard.src = getImageForCard(previousCard);
    leftCardTitle.textContent = "Previous Card: " + previousCard.toString();
    previousCard = cardDrawn;
    


    //checking if the new card is higher than the previous card
    if(nextCardDrawnValue > previousCardValue){
        console.log("You won the bet!");
        console.log("Potential winnings high: " + potentialWinningsHighGlobal);
        console.log("Bet amount: " + betAmount.value);
        cashoutAmount.textContent = "Cash Out: $" + betAmount.value;
        betAmount.value = potentialWinningsHighGlobal;
        cashoutAmount.textContent = "Cash Out: $" + betAmount.value;
        console.log("Cash out amount: " + cashoutAmount.textContent);
        console.log("Bet amount: " + betAmount.value);

        //display new odds for new card
        let odds = calculateOdds(cardDrawn);
        console.log("Odds: " + odds.highOdds);
        let potentialWinningsValues = potentialWinnings(odds.highOdds, odds.lowOdds, odds.sameOdds);
        console.log("Potential winnings high: " + potentialWinningsValues.potentialWinningsHigh);
        console.log("Potential winnings low: " + potentialWinningsValues.potentialWinningsLow);
        console.log("Potential winnings same: " + potentialWinningsValues.potentialWinningsSame);
        console.log("Odds: " + odds.highOdds + " " + odds.lowOdds + " " + odds.sameOdds);
        potentialWinningsHighGlobal = potentialWinningsValues.potentialWinningsHigh;
        potentialWinningsLowGlobal = potentialWinningsValues.potentialWinningsLow;
        potentialWinningsSameGlobal = potentialWinningsValues.potentialWinningsSame;
        //displaying the potential winnings and odds
        //I want to display the potential winnings and odds under each coressponding button
        highButton.textContent = "Win: " + potentialWinningsValues.potentialWinningsHigh + " Odds: " + odds.highOdds+"X";
        lowButton.textContent = "Win: " + potentialWinningsValues.potentialWinningsLow + " Odds: " + odds.lowOdds+"X";
        sameButton.textContent = "Win: " + potentialWinningsValues.potentialWinningsSame + " Odds: " + odds.sameOdds+"X";
        checkOdds();
    } else {
        celebrateLoss();
        gameEnd();
    }
}
  
//the function that is called when the low button is clicked
function lowButtonFunction() {
    console.log("Low button clicked");
    //checking if the game has started
    if(gameCheck() == false){
        startGameFirstAlert();
        console.log("Game not started!");
        return;
    }

    //drawing a new card
    console.log("High button clicked");
    let previousCardValue = parseInt(previousCard.getValue()); // Compare to the PREVIOUS card
    cardDrawn = deck.drawCard();
    let nextCardDrawnValue = parseInt(cardDrawn.getValue());
    console.log("Next card drawn value: " + nextCardDrawnValue);
    console.log("Previous card value: " + previousCardValue);

    //displaying the new card
    console.log("Displaying new card");
    centerCard.src = getImageForCard(cardDrawn);
    centerCardTitle.textContent = "Current Card: " + cardDrawn.toString();

    //change left card to the old card
    console.log("Changing left card to previous card");
    leftCard.src = getImageForCard(previousCard);
    leftCardTitle.textContent = "Previous Card: " + previousCard.toString();
    previousCard = cardDrawn;
    


    //checking if the new card is higher than the previous card
    if(nextCardDrawnValue < previousCardValue){
        console.log("You won the bet!");
        console.log("Potential winnings high: " + potentialWinningsLowGlobal);
        console.log("Bet amount: " + betAmount.value);
        cashoutAmount.textContent = "Cash Out: $" + betAmount.value;
        betAmount.value = potentialWinningsLowGlobal;
        cashoutAmount.textContent = "Cash Out: $" + betAmount.value;
        console.log("Cash out amount: " + cashoutAmount.textContent);
        console.log("Bet amount: " + betAmount.value);

        //display new odds for new card
        let odds = calculateOdds(cardDrawn);
        console.log("Odds: " + odds.highOdds);
        let potentialWinningsValues = potentialWinnings(odds.highOdds, odds.lowOdds, odds.sameOdds);
        console.log("Potential winnings high: " + potentialWinningsValues.potentialWinningsHigh);
        console.log("Potential winnings low: " + potentialWinningsValues.potentialWinningsLow);
        console.log("Potential winnings same: " + potentialWinningsValues.potentialWinningsSame);
        console.log("Odds: " + odds.highOdds + " " + odds.lowOdds + " " + odds.sameOdds);
        potentialWinningsHighGlobal = potentialWinningsValues.potentialWinningsHigh;
        potentialWinningsLowGlobal = potentialWinningsValues.potentialWinningsLow;
        potentialWinningsSameGlobal = potentialWinningsValues.potentialWinningsSame;
        //displaying the potential winnings and odds
        //I want to display the potential winnings and odds under each coressponding button
        highButton.textContent = "Win: " + potentialWinningsValues.potentialWinningsHigh + " Odds: " + odds.highOdds+"X";
        lowButton.textContent = "Win: " + potentialWinningsValues.potentialWinningsLow + " Odds: " + odds.lowOdds+"X";
        sameButton.textContent = "Win: " + potentialWinningsValues.potentialWinningsSame + " Odds: " + odds.sameOdds+"X";
        checkOdds();
    } else {
        celebrateLoss();
        console.log("You lost!");
        gameEnd();
    }
}

//the function that is called when the same button is clicked
function sameButtonFunction() {
    console.log("Same button clicked");
        //checking if the game has started
        if(gameCheck() == false){
            startGameFirstAlert();
            console.log("Game not started!");
            return;
        }
    
        //drawing a new card
        console.log("High button clicked");
        let previousCardValue = parseInt(previousCard.getValue()); // Compare to the PREVIOUS card
        cardDrawn = deck.drawCard();
        let nextCardDrawnValue = parseInt(cardDrawn.getValue());
        console.log("Next card drawn value: " + nextCardDrawnValue);
        console.log("Previous card value: " + previousCardValue);
    
        //displaying the new card
        console.log("Displaying new card");
        centerCard.src = getImageForCard(cardDrawn);
        centerCardTitle.textContent = "Current Card: " + cardDrawn.toString();
    
        //change left card to the old card
        console.log("Changing left card to previous card");
        leftCard.src = getImageForCard(previousCard);
        leftCardTitle.textContent = "Previous Card: " + previousCard.toString();
        previousCard = cardDrawn;
        
    
    
        //checking if the new card is higher than the previous card
        if(nextCardDrawnValue === previousCardValue){
            console.log("You won the bet!");
            console.log("Potential winnings high: " + potentialWinningsSameGlobal);
            console.log("Bet amount: " + betAmount.value);
            cashoutAmount.textContent = "Cash Out: $" + betAmount.value;
            betAmount.value = potentialWinningsSameGlobal;
            cashoutAmount.textContent = "Cash Out: $" + betAmount.value;
            console.log("Cash out amount: " + cashoutAmount.textContent);
            console.log("Bet amount: " + betAmount.value);

            //display new odds for new card
            let odds = calculateOdds(cardDrawn);
            console.log("Odds: " + odds.highOdds);
            let potentialWinningsValues = potentialWinnings(odds.highOdds, odds.lowOdds, odds.sameOdds);
            console.log("Potential winnings high: " + potentialWinningsValues.potentialWinningsHigh);
            console.log("Potential winnings low: " + potentialWinningsValues.potentialWinningsLow);
            console.log("Potential winnings same: " + potentialWinningsValues.potentialWinningsSame);
            console.log("Odds: " + odds.highOdds + " " + odds.lowOdds + " " + odds.sameOdds);
            potentialWinningsHighGlobal = potentialWinningsValues.potentialWinningsHigh;
            potentialWinningsLowGlobal = potentialWinningsValues.potentialWinningsLow;
            potentialWinningsSameGlobal = potentialWinningsValues.potentialWinningsSame;
            //displaying the potential winnings and odds
            //I want to display the potential winnings and odds under each coressponding button
            highButton.textContent = "Win: " + potentialWinningsValues.potentialWinningsHigh + " Odds: " + odds.highOdds+"X";
            lowButton.textContent = "Win: " + potentialWinningsValues.potentialWinningsLow + " Odds: " + odds.lowOdds+"X";
            sameButton.textContent = "Win: " + potentialWinningsValues.potentialWinningsSame + " Odds: " + odds.sameOdds+"X";
            checkOdds();
        } else {
            celebrateLoss();
            console.log("You lost!");
            gameEnd();

        }
}


//ends the game and resets the variables needed
function gameEnd(){
    GameStarted = false;
    betAmount.value = 0;
    cashoutAmount.textContent = "Cash Out: $";
    placeBet.disabled = false;
}

//checks if the game has started and if the deck is empty
function gameCheck() {
    if(GameStarted == false){
        return false;
    }else if(deck.getSize() == 0){
        deckEmptyAlert();
        return false;
    }else{
        return true;
    }
}

//the function that is called when the cash out button is clicked
function cashOutFunction() {
    if(gameCheck() == false){
        startGameFirstAlert();
        console.log("Game not started!");
        return;
    }
    celebrateWin();
    console.log("Cash out button clicked");
    balance += Number(betAmount.value);
    balanceElement.textContent = `Balance: $${balance}`;
    gameEnd();
    placeBet.disabled = false;
}

//gets the image for the card
function getImageForCard(card) {
    let value = card.getValue();
    let suit = card.getSuit();
    if( suit == "Hearts" ){
        suit = "H";
    } else if( suit == "Diamonds" ){
        suit = "D";
    } else if( suit == "Clubs" ){
        suit = "C";
    } else if( suit == "Spades" ){
        suit = "S";
    }
    if( value == "11" ){
        value = "J";
    } else if( value == "12" ){
        value = "Q";
    } else if( value == "13" ){
        value = "K";
    }
    if( value == "1" ){
        value = "A";
    }
    let image = `Images/${value}${suit}.png`;
    return image;
}

//checks if the odds are infinite and disables the buttons if they are
function checkOdds(){
    if(potentialWinningsHighGlobal == 'Infinity'){
        highButtonReal.disabled = true;
        highButton.textContent = "Win: $0 | Odds: 0.00";
    }else if(potentialWinningsHighGlobal != 'Infinity'){
        highButtonReal.disabled = false;
    }
    if(potentialWinningsLowGlobal == 'Infinity'){
        lowButtonReal.disabled = true;
        lowButton.textContent = "Win: $0 | Odds: 0.00";
    }else if(potentialWinningsLowGlobal != 'Infinity'){
        lowButtonReal.disabled = false;
    }
    if(potentialWinningsSameGlobal == 'N/   '){
        sameButtonReal.disabled = true;
        sameButton.textContent = "Win: $0 | Odds: 0.00";
    }else if(potentialWinningsSameGlobal != 'N/A'){
        sameButtonReal.disabled = false;
    }
    return;
}

// Make functions available globally for onclick handlers
window.addBet = addBet;
window.setMaxBet = setMaxBet;
window.startGame = startGame;
window.resetGame = resetGame;
window.highButtonFunction = highButtonFunction;
window.lowButtonFunction = lowButtonFunction;
window.sameButtonFunction = sameButtonFunction;
window.alertDeckEmpty = alertDeckEmpty;
window.alertNotEnoughMoney = alertNotEnoughMoney;
window.alertStartGameFirst = alertStartGameFirst;
window.celebrateWin = celebrateWin;
window.celebrateLoss = celebrateLoss;
window.checkOdds = checkOdds;
window.gameCheck = gameCheck;
window.getImageForCard = getImageForCard;
window.potentialWinnings = potentialWinnings;
window.calculateOdds = calculateOdds;
window.cashOutFunction = cashOutFunction;

