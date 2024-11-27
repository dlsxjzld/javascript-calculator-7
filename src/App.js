import { Input, Output } from './View.js';

const toThrowNewError = (condition, message) => {
  if (condition) {
    throw new Error(`[ERROR] ${message}\n`);
  }
};

const hasEmptySpace = (input) => {
  toThrowNewError(input.includes(' '), '공백을 포함하면 안됩니다. ex)1,2');
};

const check = (input) => {
  hasEmptySpace(input);
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
