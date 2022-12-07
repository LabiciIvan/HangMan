/**
 * Creates a new instance of Creator.
 * @class
 */
export default class Creator {
    /**
     * 
     * @constructor
     */
    constructor() {

    }

    /**
     * @method create
     * @fires createElement
     * @param {string} name      - The name of element you want to create.
     * @param {string} className - className for this element.
     * @param {string} innerText - innerHtml for this element.
     * @returns {Element}
     */
    create = (name, className, innerText) => {
        this.name = name;
        this.className = className;
        this.innerText = innerText;

        let element = document.createElement(this.name);
            element.className = this.className;
        
        this.innerText ? element.innerHTML = innerText : '';

        return element;
    }
}