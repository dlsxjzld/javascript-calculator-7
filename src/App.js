import { DELIMITER } from './constant.js';
import { escapeRegExp } from './util.js';
import { check } from './Validation.js';
import { Input, Output } from './View.js';

class App {
  escapedUserInput;

  async run() {
    const userInput = await Input.readUserInput();
    if (userInput === '') {
      Output.printResult(0);
      return;
    }
    this.getEscapedUserInput(userInput);
    check(this.escapedUserInput);
    Output.printResult(this.add());
  }

  add() {
    const numbers = this.escapedUserInput.split(new RegExp(DELIMITER.map(escapeRegExp).join('|'))).map(Number);
    return numbers.reduce((a, b) => a + b, 0);
  }

  getEscapedUserInput(userInput) {
    this.escapedUserInput = escapeRegExp(userInput);
    const matched = this.escapedUserInput.match(/^\/\/(.*)\\\\n/);
    if (matched === null) {
      return;
    }
    const [cutString, customDelimiter] = matched;
    this.escapedUserInput = this.escapedUserInput.replace(cutString, '');
    this.getCustomDelimiter(customDelimiter);
  }

  getCustomDelimiter(customDelimiter) {
    if (customDelimiter === '') {
      return;
    }
    DELIMITER.unshift(customDelimiter);
  }
}

export default App;
