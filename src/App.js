import { Input, Output } from './View.js';

class App {
  async run() {
    // throw new Error('[ERROR] 에러 발생 ');
    const userInput = await Input.readUserInput();

    Output.printResult(userInput);
  }
}

export default App;
