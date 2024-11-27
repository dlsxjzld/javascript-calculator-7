import { escapeRegExp } from './util.js';
import { check } from './Validation.js';
import { Input, Output } from './View.js';

class App {
  escapedUserInput;

  DELIMITER = [',', ':'];

  async run() {
    const userInput = await Input.readUserInput();
    if (userInput === '') {
      Output.printResult(0);
      return;
    }
    this.getEscapedUserInput(userInput);
    check(this.escapedUserInput, this.DELIMITER);
    Output.printResult(this.add());
  }

  add() {
    const numbers = this.escapedUserInput.split(new RegExp(this.DELIMITER.map(escapeRegExp).join('|'))).map(Number);
    return numbers.reduce((a, b) => a + b, 0);
  }

  getEscapedUserInput(userInput) {
    this.escapedUserInput = userInput;
    const matched = this.escapedUserInput.match(/^\/\/(.*)\\n/);
    if (matched === null) {
      return;
    }
    const customDelimiter = matched[1];
    this.escapedUserInput = this.escapedUserInput.replace(/^\/\/(.*)\\n/, '');
    this.getCustomDelimiter(customDelimiter);
  }

  getCustomDelimiter(customDelimiter) {
    if (customDelimiter === '') {
      return;
    }
    this.DELIMITER.unshift(customDelimiter);
  }
}

export default App;
