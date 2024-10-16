import { Console } from "@woowacourse/mission-utils"
const DIVIDER = [",", ":"]
class App {
  async run() {
    const input = await Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요.\n",
    )

    Console.print(input.split(new RegExp(`[${DIVIDER}]`, "g")))
  }
}

export default App
