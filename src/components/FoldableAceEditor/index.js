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
  componentDidUpdate(prevProps, prevState, snapshot) {
    super.componentDidUpdate(prevProps, prevState, snapshot);

    const { editorEnabled, shouldBuild, editingFile } = this.props.current;

    if (!editorEnabled) {
      this.removeComments();
    }
  }

  removeLeadingWhiteSpace(ranges, offsets, session) {
    let index = 0;
    for (let range = 0; range < ranges.length; range++) {
      const start = ranges[range].start.row;
      const end = ranges[range].end.row - 1;
      if (index < start) {
        for (let i = index; i < start; i++) {
          if (session.getLine(i).trim() === "") {
            ranges.splice(range, 0, {
              start: { row: i, column: 0 },
              end: { row: i + 1, column: 0 },
            });
            range++;
            for (let j = i + 1; j < offsets.length; j++) {
              offsets[j]++;
            }
          } else {
            // non-empty, non-excluded line found
            return;
          }
        }
      }
      index = end + 1;
    }
  }

  markRowAsDeleted(row, ranges, offsets) {
    ranges.push({
      start: { row: row, column: 0 },
      end: { row: row + 1, column: 0 },
    });
    for (let i = row + 1; i < offsets.length; i++) {
      offsets[i]++;
    }
  }

  removeComments() {
    const { editingFile } = this.props.current;
    const fileExt = extension(editingFile.name);
    if (!["md", "js"].includes(fileExt)) return;
    const session = this.editor.getSession();
    const offsets = new Array(session.getLength() + 1).fill(0);
    const ranges = [];
    for (let row = 0; row < session.getLength(); row++) {
      if (!/^\s*\/\/.+{\s*$/.test(session.getLine(row))) {
        continue;
      }
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
          for (let i = range.end.row; i <= session.getLength(); i++) {
            offsets[i] += range.end.row - range.start.row;
          }
          ranges.push(range);
        }
        if (line.includes("// combine")) {
          this.markRowAsDeleted(range.start.row, ranges, offsets);
          this.markRowAsDeleted(range.end.row, ranges, offsets);
        }
      }
    }
    this.removeLeadingWhiteSpace(ranges, offsets, session);
    for (const range of ranges.reverse()) {
      session.remove(range);
    }
    this.props.setOffsets(offsets);
  }

  /*     removeComments() {
    const { editingFile } = this.props.current;
    const fileExt = extension(editingFile.name);
    if (!(fileExt === "js")) return;
    const session = this.editor.getSession();
    const lineCount = session.getValue().split("\n").length;
    const offsets = new Array(lineCount + 1).fill(0);
    let tracing = false;
    let offset = 0;
    let rows = [];
    for (let row = 0; row < session.getLength(); row++) {
      if (tracing) {
        if (session.getLine(row).includes(">>>")) {
          tracing = false;
          rows.push(row);
          offset++;
        }
      } else {
        if (session.getLine(row).includes("<<<")) {
          tracing = true;
        }
        rows.push(row);
        offset++;
      }
      offsets[row + 1] = offset;
    }
    for (let row of rows.reverse()) {
      session.removeFullLines(row, row);
    }
    this.props.setOffsets(offsets);
  } */

  resize() {
    this.editor.resize();
  }
}

export default connect(({ current }) => ({ current }), actions, null, {
  forwardRef: true,
})(FoldableAceEditor);
