import { Commander } from "./"

export default class Layout extends Commander {
  /**
   * Create a layout.
   *
   * @param children The child views to contain.
   */
  constructor(children) {
    super(arguments)
  }

  /**
   * Set a view as the root view.
   *
   * @param root
   */
  static setRoot(root) {
    this.command(null, "setRoot", arguments)
  }

  /**
   * Add a child to the layout.
   *
   * @param child
   * @param index The index to add the child to.
   */
  add(child, index) {
    this.command("add", arguments)
  }

  /**
   * Remove a child from the layout.
   *
   * @param child
   */
  remove(child) {
    this.command("remove", arguments)
  }

  /**
   * Remove all the child views from the layout.
   */
  removeAll() {
    this.command("removeAll", arguments)
  }
}
