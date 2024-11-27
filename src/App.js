import { Input, Output } from './View.js';

const DELIMITER = [',', ':'];

const toThrowNewError = (condition, message) => {
  if (condition) {
    throw new Error(`[ERROR] ${message} 다음과 같이 입력해주세요. ex)1,2:3\n`);
  }
};

const hasEmptySpace = (input) => {
  toThrowNewError(input.includes(' '), '공백을 포함하면 안됩니다.');
};

const hasStringType = (input) => {
  const splitInputs = input.split(new RegExp(DELIMITER.join('|'))).map(Number);
  toThrowNewError(
    splitInputs.some((splitInput) => !Number.isInteger(splitInput)),
    '구분자가 아닌 문자가 섞여있습니다.',
  );
};

const isPositiveNumber = (input) => {
  const splitInputs = input.split(new RegExp(DELIMITER.join('|'))).map(Number);
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
const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $&은 일치한 문자열 전체를 의미

class App {
  result;

  async run() {
    // throw new Error('[ERROR] 에러 발생 ');
    const userInput = await Input.readUserInput();
    if (userInput === '') {
      this.checkEmptyString(userInput);
      return;
    }
    let escapedUserInput = escapeRegExp(userInput);

    const matched = escapedUserInput.match(/\/\/(.*)\\\\n/);
    console.log('matched', matched);
    if (matched !== null) {
      const [cutString, customDelimiter] = matched;
      escapedUserInput = escapedUserInput.replace(cutString, '');
      // console.log('escapedUserInput', escapedUserInput);
      if (customDelimiter !== '') {
        DELIMITER.unshift(customDelimiter);
      }
    }

    // TODO: 커스텀 구분자 있으면 추가해야함
    // TODO: 커스텀 구분자 추가했으면 userInput에서 커스텀 구분자 지워야함

    check(escapedUserInput);
    // TODO: 검증 로직 필요

    this.input = escapedUserInput.split(new RegExp(DELIMITER.join('|'))).map(Number);

    Output.printResult(escapedUserInput);
  }

  checkEmptyString(input) {
    this.result = Number(input);
    Output.printResult(this.result);
  }
}

export default App;
