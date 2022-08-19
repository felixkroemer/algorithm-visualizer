import { Tracer } from "./"

export default class Array1DTracer extends Tracer {
  /**
   * Set an array to visualize.
   *
   * @param array1d
   */
  set(array1d) {
    this.command("set", arguments)
  }

  /**
   * Notify that a value has been changed.
   *
   * @param x The index of the array.
   * @param v The new value to change to.
   */
  patch(x, v) {
    this.command("patch", arguments)
  }

  /**
   * Stop notifying that a value has been changed.
   *
   * @param x The index of the array.
   */
  depatch(x) {
    this.command("depatch", arguments)
  }

  /**
   * Select indices of the array.
   *
   * @param sx The index to select inclusively from.
   * @param ex The index to select inclusively to. If omitted, it will only select index `sx`.
   */
  select(sx, ex) {
    this.command("select", arguments)
  }

  /**
   * Stop selecting indices of the array.
   *
   * @param sx The index to stop selecting inclusively from.
   * @param ex The index to stop selecting inclusively to. If omitted, it will only stop selecting index `sx`.
   */
  deselect(sx, ex) {
    this.command("deselect", arguments)
  }

  /**
   * Synchronize with a chart tracer.
   *
   * @param chartTracer
   */
  chart(chartTracer) {
    this.command("chart", arguments)
  }
}
