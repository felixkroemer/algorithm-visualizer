import AceEditor from "react-ace";
import { connect } from "react-redux";
import "brace/ext/searchbox";
import "brace/mode/javascript";
import "brace/mode/markdown";
import "brace/mode/plain_text";
import "brace/theme/tomorrow_night_eighties";
import { extension } from "common/util";
import { actions } from "reducers";

class FoldableAceEditor extends AceEditor {
  componentDidMount() {
    super.componentDidMount();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    super.componentDidUpdate(prevProps, prevState, snapshot);

    const { editorEnabled } = this.props.current;

    if (!editorEnabled) {
      this.removeComments();
    }
  }

  removeComments() {
    const { editingFile } = this.props.current;
    const fileExt = extension(editingFile.name);
    if (!["md", "js"].includes(fileExt)) return;
    const session = this.editor.getSession();
    for (let row = 0; row < session.getLength(); row++) {
      if (!/^\s*\/\/.+{\s*$/.test(session.getLine(row))) continue;
      const range = session.getFoldWidgetRange(row);
      if (range) {
        const line = session.getLine(row);
        if (
          line.includes("// visualize") ||
          line.includes("// import visualization libraries") ||
          line.includes("// define tracer variables") ||
          line.includes("// logger")
        ) {
          range.setStart(range.start.row, 0);
          range.setEnd(range.end.row + 1, 0);
          session.remove(range);
        }
      }
    }
  }

  resize() {
    this.editor.resize();
  }
}

export default connect(({ current }) => ({ current }), actions, null, {
  forwardRef: true,
})(FoldableAceEditor);
