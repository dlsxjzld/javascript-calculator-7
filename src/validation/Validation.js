import { escapeRegExp } from '../util/util.js';

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

const hasStringType = (input, escapedDelimiter) => {
  const splitInputs = input.split(escapedDelimiter).map(convertType);

  toThrowNewError(
    splitInputs.some((splitInput) => Number.isNaN(splitInput)),
    '구분자와 문자를 알맞게 입력해주세요. 구분자는 문자 보다 하나 적어야 합니다.',
  );
};

const isPositiveNumber = (input, escapedDelimiter) => {
  const splitInputs = input.split(escapedDelimiter).map(convertType);
  toThrowNewError(
    splitInputs.some((splitInput) => splitInput <= 0),
    '1 이상만 가능합니다.',
  );
};

export const check = (input, delimiter) => {
  const escapedDelimiter = new RegExp(delimiter.map(escapeRegExp).join('|'));
  hasEmptySpace(input);
  hasStringType(input, escapedDelimiter);
  isPositiveNumber(input, escapedDelimiter);
};
