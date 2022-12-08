import Creator from "./Creator.js";
import Validator from "./Validator.js";

/**
 * Creates a new instance of Hangman.
 * @class Hangman
 */
export default class Hangman extends Creator {

    /**
     * @constructs
     * @param {string} place - Where to load the game.
     */
    constructor(place) {
        super();
        this.health = 6;
        this.place = place;
        this.inputClassName = '.input-word';
        this.keyboard = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    }
    


    /**
     * @method initialiseGame
     * @fires getElement 
     * @fires create
     */
    initialiseGame() {
        
        let element = this.getElement(this.place);
        
        let input = this.create('input', 'input-word', 'Enter a word');
            
        let button = this.create('button', 'start-btn', 'START');
            button.onclick = (e) => this.triggerStart(e);

        let errorDiv = this.create('div', 'error-div');
        
        element.append(input);
        element.append(button);
        element.append(errorDiv);
    }

    /**
     * @method triggerStart
     * @fires getElement
     * @fires loadGame
     * @param {Element} e - the element that triggered this method.
     */
     triggerStart = (e) => {

        this.word = this.getElement(this.inputClassName).value.toUpperCase();
        this.letterToGuess = this.word.length + 1;

        let result = new Validator().validate(this.word);

        if(!result) { new Validator().throwError('Only characters from a - z allowed', '.error-div'); return;}
        
        this.loadGame();
    }

    /**
     * @method loadGame
     * @fires getElement
     * @fires create
     * @fires this.showKeyboard
     */
    loadGame = () => {

        let gameDiv = this.getElement(this.place);
            gameDiv.innerHTML = '';

        let wordDiv = this.create('div', 'word');

        // Iterate this.word string and create a div for each letter and append to wordDiv
         for (let i = 0; i < this.word.length; ++i)  {
            let eachLetter = this.create('div',`guess ${this.word[i]}`);
                
            wordDiv.append(eachLetter);
         }

         gameDiv.append(wordDiv);
         this.showKeyboard();
    }


    /**
     * @method showKeyboard
     * @fires create
     * @fires getElement
     */
    showKeyboard = () => {

        let element = this.create('div', 'keyboard');
        
        // Iterate over the this.keyboard string and create a button for each letter.
        for (let i = 0; i < this.keyboard.length; ++i) {

            let btn = this.create('button', `specific-key ${this.keyboard[i]}`, this.keyboard[i]);
                btn.onclick = (e) => this.triggerKeyboard(e.target);

            element.append(btn);
        }

        let parent = this.getElement(this.place);
            parent.append(element);

    }

    /**
     * @method triggerKeyboard
     * @fires revealLetter
     * @param {Element} e - Button that triggers this method. 
     */
    triggerKeyboard = (e) => {

        e.disabled = true;
        
        if( this.health <= 0 ) { return }

        let found = false;
        let pressedButton = e.innerHTML;

        for (let i = 0; i < this.word.length; ++i) {

            this.word[i] === pressedButton ? found = true : '';
        }

        found ? this.revealLetter(pressedButton) : --this.health;
        
        this.checkProgress();
    }

    /**
     * @method revealLetter
     * @fires querySelectorAll
     * @param {string} letter 
     */
    revealLetter = (letter) => {

        let element = document.querySelectorAll(`.${letter}`);

        this.letterToGuess -= element.length;

        element.forEach( item => { item.innerHTML = letter; });
    }


    /**
     * @method checkProgress
     * @fires querySelectorAll
     */
    checkProgress = () => {

        if (this.health <= 0) {

            let allButtons = document.querySelectorAll('.specific-key');

            allButtons.forEach(element => { element.disabled = true; });
        }
        console.log(this.letterToGuess);

        if(this.health > 0 && this.letterToGuess < 0) {
            console.log('winnner');
            let allButtons = document.querySelectorAll('.specific-key');

            allButtons.forEach(element => { element.disabled = true; });
        }
    }
}