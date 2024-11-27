import { MissionUtils } from '@woowacourse/mission-utils';
import App from '../src/App.js';

const toThrowNewError = (condition, message) => {
  if (condition) {
    throw new Error(`[ERROR] ${message}\n`);
  }
};

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('문자열 계산기', () => {
  test.skip('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test.skip('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test.skip('예외 테스트', async () => {
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test.skip('입출력 테스트', async () => {
    const inputs = ['1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
  test.each([
    ['', '결과 : 0'],
    // ['1,2', '결과 : 3'],
    // ['1,2,3', '결과 : 6'],
    // ['1,2:3', '결과 : 6'],
  ])('정상값 테스트', async (input, userOutput) => {
    mockQuestions([input]);

    const logSpy = getLogSpy();
    const outputs = [userOutput];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('공백 포함 시 에러 발생', () => {
    const hasEmptySpace = (input) => {
      toThrowNewError(input.includes(' '), '공백을 포함하면 안됩니다. ex)1,2');
    };
    expect(() => {
      hasEmptySpace('1,2 ');
    }).toThrow('[ERROR]');
  });

  test('구분자가 아닌 문자가 섞여있으면 에러 발생', () => {
    const hasStringType = (input) => {
      const splitInputs = input.split(new RegExp([',', ':'].join('|'))).map(Number);
      toThrowNewError(
        splitInputs.some((splitInput) => !Number.isInteger(splitInput)),
        '구분자가 아닌 문자가 섞여있습니다.',
      );
    };

    expect(() => {
      hasStringType('1,2a');
    }).toThrow('[ERROR]');
  });
  test.only('0이하면 에러 발생', () => {
    const isPositiveNumber = (input) => {
      const splitInputs = input.split(new RegExp([',', ':'].join('|'))).map(Number);
      toThrowNewError(
        splitInputs.some((splitInput) => splitInput <= 0),
        '1 이상만 가능합니다.',
      );
    };

    expect(() => {
      isPositiveNumber('1,2,0,-1');
    }).toThrow('[ERROR]');
  });
});
