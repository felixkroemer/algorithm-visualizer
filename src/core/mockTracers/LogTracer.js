import { Tracer } from "./"

export default class LogTracer extends Tracer {
  /**
   * Set initial log to show.
   *
   * @param log
   */
  set(log) {
    this.command("set", arguments)
  }

  /**
   * Print log.
   *
   * @param message
   */
  print(message) {
    this.command("print", arguments)
  }

  /**
   * Print log and put a line break.
   *
   * @param message
   */
  println(message) {
    this.command("println", arguments)
  }

  /**
   * Print formatted log.
   *
   * @param format Refer to [sprintf-js](https://github.com/alexei/sprintf.js#format-specification).
   * @param args
   */
  printf(format, ...args) {
    this.command("printf", arguments)
  }
}
