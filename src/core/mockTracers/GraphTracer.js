import { Tracer } from "./"

export default class GraphTracer extends Tracer {
  /**
   * Set an adjacency matrix to visualize.
   *
   * @param array2d
   */
  set(array2d) {
    this.command("set", arguments)
  }

  /**
   * Make the graph directed.
   *
   * @param isDirected
   */
  directed(isDirected) {
    this.command("directed", arguments)
    return this
  }

  /**
   * Make the graph weighted.
   *
   * @param isWeighted
   */
  weighted(isWeighted) {
    this.command("weighted", arguments)
    return this
  }

  /**
   * Arrange nodes on a circular layout.
   */
  layoutCircle() {
    this.command("layoutCircle", arguments)
    return this
  }

  /**
   * Arrange nodes on a tree layout.
   *
   * @param root The id of a root node.
   * @param sorted Whether to sort sibling nodes.
   */
  layoutTree(root, sorted) {
    this.command("layoutTree", arguments)
    return this
  }

  /**
   * Arrange nodes randomly.
   */
  layoutRandom() {
    this.command("layoutRandom", arguments)
    return this
  }

  /**
   * Add a node.
   *
   * @param id
   * @param weight
   * @param x The x position between `-160` and `+160`.
   * @param y The y position between `-160` and `+160`.
   */
  addNode(id, weight, x, y) {
    this.command("addNode", arguments)
  }

  /**
   * Update a node.
   *
   * @param id
   * @param weight
   * @param x The x position between `-160` and `+160`.
   * @param y The y position between `-160` and `+160`.
   */
  updateNode(id, weight, x, y) {
    this.command("updateNode", arguments)
  }

  /**
   * Remove a node.
   *
   * @param id
   */
  removeNode(id) {
    this.command("removeNode", arguments)
  }

  /**
   * Add an edge.
   *
   * @param source The id of the node where the edge starts.
   * @param target The id of the node where the edge ends.
   * @param weight
   */
  addEdge(source, target, weight) {
    this.command("addEdge", arguments)
  }

  /**
   * Update an edge.
   *
   * @param source The id of the node where the edge starts.
   * @param target The id of the node where the edge ends.
   * @param weight
   */
  updateEdge(source, target, weight) {
    this.command("updateEdge", arguments)
  }

  /**
   * Remove an edge.
   *
   * @param source The id of the node where the edge starts.
   * @param target The id of the node where the edge ends.
   */
  removeEdge(source, target) {
    this.command("removeEdge", arguments)
  }

  /**
   * Visit a node.
   *
   * @param target The id of the node to visit.
   * @param source The id of the node to visit from.
   * @param weight The weight of `target` to set to.
   */
  visit(target, source, weight) {
    this.command("visit", arguments)
  }

  /**
   * Leave after visiting a node.
   *
   * @param target The id of the node to leave.
   * @param source The id of the node to leave to.
   * @param weight The weight of `target` to set to.
   */
  leave(target, source, weight) {
    this.command("leave", arguments)
  }

  /**
   * Select a node.
   *
   * @param target The id of the node to select.
   * @param source The id of the node to select from.
   */
  select(target, source) {
    this.command("select", arguments)
  }

  /**
   * Stop selecting a node.
   *
   * @param target The id of the node to stop selecting.
   * @param source The id of the node to stop selecting from.
   */
  deselect(target, source) {
    this.command("deselect", arguments)
  }

  /**
   * Synchronize with a log tracer.
   *
   * @param logTracer
   */
  log(logTracer) {
    this.command("log", arguments)
  }
}
