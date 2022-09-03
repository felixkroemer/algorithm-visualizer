import React from "react";
import faTrashAlt from "@fortawesome/fontawesome-free-solid/faTrashAlt";
import faUser from "@fortawesome/fontawesome-free-solid/faUser";
import { classes, extension } from "common/util";
import { actions } from "reducers";
import { connect } from "react-redux";
import { Button, Ellipsis, FoldableAceEditor } from "components";
import styles from "./CodeEditor.module.scss";
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { offsets: [] };
    this.setOffsets = this.setOffsets.bind(this);
  }

  setOffsets(offsets) {
    if (offsets.toString() !== this.state.offsets?.toString())
      this.setState({ offsets: offsets });
  }

  translateLineNumber(lineNumber) {
    const { editorEnabled } = this.props.current;
    if (editorEnabled) {
      return lineNumber;
    } else {
      return lineNumber - this.state.offsets.at(lineNumber);
    }
  }


  render() {
    const { className } = this.props;
    const { editingFile } = this.props.current;
    const { user } = this.props.env;
    const { lineIndicator } = this.props.player;
    const { editorEnabled } = this.props.current;

    if (!editingFile) return null;

    const fileExt = extension(editingFile.name);
    const mode =
      fileExt === "js"
        ? "javascript"
        : fileExt === "md"
        ? "markdown"
        : "plain_text";

    return (
      <div className={classes(styles.code_editor, className)}>
        <FoldableAceEditor
          className={styles.ace_editor}
          mode={mode}
          theme="tomorrow_night_eighties"
          name="code_editor"
          onChange={(code) => {
            if (editorEnabled) {
              this.props.modifyFile(editingFile, code);
            }
          }}
          setOffsets={this.setOffsets}
          readOnly={!editorEnabled}
          markers={
            lineIndicator
              ? [
                  {
                    startRow: this.translateLineNumber(
                      lineIndicator.lineNumber
                    ),
                    startCol: 0,
                    endRow: this.translateLineNumber(lineIndicator.lineNumber),
                    endCol: Infinity,
                    className: styles.current_line_marker,
                    type: "fullLine",
                    inFront: true,
                    _key: lineIndicator.cursor,
                  },
                ]
              : []
          }
          value={editingFile.content}
        />
        <div className={classes(styles.contributors_viewer, className)}>
          <span className={classes(styles.contributor, styles.label)}>
            Contributed by
          </span>
          {(
            editingFile.contributors || [
              user || { login: "guest", avatar_url: faUser },
            ]
          ).map((contributor) => (
            <Button
              className={styles.contributor}
              icon={contributor.avatar_url}
              key={contributor.login}
              href={`https://github.com/${contributor.login}`}
            >
              {contributor.login}
            </Button>
          ))}
          <div className={styles.empty}>
            <div className={styles.empty} />
            <Button
              className={styles.delete}
              icon={faWrench}
              primary
              onClick={() => this.props.toggleEditor()}
            >
              <Ellipsis>
                {this.props.current.editorEnabled
                  ? "Disable Editing"
                  : "Enable Editing"}
              </Ellipsis>
            </Button>
            <Button
              className={styles.delete}
              icon={faTrashAlt}
              primary
              confirmNeeded
              onClick={() => this.props.deleteFile(editingFile)}
            >
              <Ellipsis>Delete File</Ellipsis>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ current, env, player }) => ({ current, env, player }),
  actions,
  null,
)(CodeEditor);
