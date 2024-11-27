import { Input, Output } from './View.js';

const toThrowNewError = (condition, message) => {
  if (condition) {
    throw new Error(`[ERROR] ${message}\n`);
  }
};

const emptyInput = (input) => {
  toThrowNewError(input === '');
};

const check = (input) => {
  emptyInput(input);
};

class App {
  result;

  async run() {
    // throw new Error('[ERROR] 에러 발생 ');
    const userInput = await Input.readUserInput();
    if (userInput === '') {
      this.result = Number(userInput);
      Output.printResult(this.result);
      return;
    }

    check(userInput);
    // TODO: 검증 로직 필요

    Output.printResult(userInput);
  }
}

export default App;
