import { Console } from '@woowacourse/mission-utils';

const USER_INPUT = '덧셈할 문자열을 입력해 주세요.\n';
const RESULT = '결과 : ';

export const Input = {
  async readUserInput() {
    const userInput = await Console.readLineAsync(USER_INPUT);
    return userInput;
  },
};

export const Output = {
  printResult(result) {
    Console.print(`${RESULT}${result}`);
  },
};
