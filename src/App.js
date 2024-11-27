import { Input, Output } from './View.js';

const DELIMITER = [',', ':'];
const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $&은 일치한 문자열 전체를 의미

const toThrowNewError = (condition, message) => {
  if (condition) {
    throw new Error(`[ERROR] ${message} 다음과 같이 입력해주세요. ex)1,2:3\n`);
  }
};

const hasEmptySpace = (input) => {
  toThrowNewError(input.includes(' '), '공백을 포함하면 안됩니다.');
};

const convertType = (val) => {
  if (val === '') {
    return NaN;
  }
  return Number(val);
};

const hasStringType = (input) => {
  const splitInputs = input.split(new RegExp(DELIMITER.map(escapeRegExp).join('|'))).map(convertType);
  toThrowNewError(
    splitInputs.some((splitInput) => !Number.isInteger(splitInput)),
    '구분자와 문자를 알맞게 입력해주세요. 구분자는 문자 보다 하나 적어야 합니다.',
  );
};

const isPositiveNumber = (input) => {
  const splitInputs = input.split(new RegExp(DELIMITER.map(escapeRegExp).join('|'))).map(Number);
  toThrowNewError(
    splitInputs.some((splitInput) => splitInput <= 0),
    '1 이상만 가능합니다.',
  );
};

const check = (input) => {
  hasEmptySpace(input);
  hasStringType(input);
  isPositiveNumber(input);
};

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
