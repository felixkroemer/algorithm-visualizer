import { Randomize } from "./";

const MAX_COMMANDS = 1000000;
const MAX_OBJECTS = 100;

export default class Commander {
  /**
   * @ignore
   */
  static commands = [];
  static objectCount = 0;
  key;

  constructor(iArguments) {
    Commander.objectCount++;
    const className = this.constructor.name;
    this.key = Commander.randomizeKey();
    this.command(className, iArguments);
  }

  /**
   * @ignore
   */
  static init() {
    this.commands = [];
    this.objectCount = 0;
  }

  static command(key, method, iArguments) {
    const args = Array.from(iArguments);
    this.commands.push({
      key,
      method,
      args: JSON.parse(JSON.stringify(args)),
    });
    if (this.commands.length > MAX_COMMANDS)
      throw new Error("Too Many Commands");
    if (this.objectCount > MAX_OBJECTS) throw new Error("Too Many Objects");
  }

  static randomizeKey() {
    return Randomize.String({
      length: 8,
      letters: "abcdefghijklmnopqrstuvwxyz0123456789",
    });
  }

  /**
   * Remove the tracer.
   */
  destroy() {
    Commander.objectCount--;
    this.command("destroy", arguments);
  }

  command(method, iArguments) {
    Commander.command(this.key, method, iArguments);
  }

  toJSON() {
    return this.key;
  }
}
