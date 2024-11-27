import { Input, Output } from './View.js';

const DELIMITER = [',', ':'];

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
      DELIMITER.unshift(customDelimiter);
    }

    // TODO: 커스텀 구분자 있으면 추가해야함
    // TODO: 커스텀 구분자 추가했으면 userInput에서 커스텀 구분자 지워야함

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
