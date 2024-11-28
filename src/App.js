import { Input, Output } from './view/View.js';
import Calculator from './model/Calculator.js';

class App {
  async run() {
    const userInput = await Input.readUserInput();
    if (userInput === '') {
      Output.printResult(0);
      return;
    }
    this.calculator = new Calculator(userInput);
    Output.printResult(this.calculator.add());
  }
}

export default App;
