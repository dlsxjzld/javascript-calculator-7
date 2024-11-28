import { escapeRegExp } from '../util/util.js';
import { check } from '../validation/validation.js';

export default class Calculator {
  #userInput;

  #DELIMITER = [',', ':'];

  constructor(userInput) {
    this.getEscapedUserInput(userInput);
    check(this.#userInput, this.#DELIMITER);
  }

  getEscapedUserInput(userInput) {
    this.#userInput = userInput;
    const matched = this.#userInput.match(/^\/\/(.*)\\n/);
    if (matched === null) {
      return;
    }
    const customDelimiter = matched[1];
    this.#userInput = this.#userInput.replace(/^\/\/(.*)\\n/, '');
    this.getCustomDelimiter(customDelimiter);
  }

  getCustomDelimiter(customDelimiter) {
    if (customDelimiter === '') {
      return;
    }
    this.#DELIMITER.unshift(customDelimiter);
  }

  add() {
    const numbers = this.#userInput
      .split(new RegExp(this.#DELIMITER.map(escapeRegExp).join('|')))
      .map(Number);
    return numbers.reduce((a, b) => a + b, 0);
  }
}
