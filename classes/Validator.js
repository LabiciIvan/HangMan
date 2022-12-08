/**
 * Creates an instance of Validator.
 * @class
 */
export default class Validator {

    /**
     * @constructor
     */
    constructor() {
        this.pattern = /^[a-zA-Z]+$/;
    }

    /**
     * @method validate
     * @param {string} word - the word you want to validated.
     * @returns {boolean} result
     */
    validate = (word) => {

        let result = this.pattern.test(word);

        return result;
    }

    /**
     * @method throwError
     * @fires querySelector
     * @param {string} errorName - whata error to generate.
     * @param {string} location  - where to throw errors.
     * @return
     */
    throwError = (errorName, location) => {

        let element =  document.querySelector(location);
            element.innerHTML = '';
            element.append(errorName);

            console.log(element);

        return;
    }
}