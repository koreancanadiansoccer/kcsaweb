import React, { FunctionComponent } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { withTheme } from '@material-ui/core/styles';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface DraftEditorProps {
  className: string;
  editorState: EditorState;
  onEditorStateChange?: (editorState: EditorState) => void;
}

const UnStyledDraftEditor: FunctionComponent<DraftEditorProps> = ({
  className,
  editorState,
  onEditorStateChange,
}) => {
  return (
    <Box className={className}>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'list',
            'textAlign',
            'history',
            'embedded',
            'emoji',
            'image',
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </Box>
  );
};

export const DraftEditor = withTheme(styled(UnStyledDraftEditor)`
  .toolbarClassName {
    border: 1px solid rgba(142, 142, 147, 0.4);
  }

  .editorClassName {
    border: 1px solid rgba(142, 142, 147, 0.4);
    height: 25rem;
  }

  .editorClassName figure {
    margin: 0;
  }
  .editorClassName .rdw-image-left {
    display: inline;
    float: left;
    margin-right: 1rem;
  }
  .editorClassName .rdw-image-right {
    display: inline;
    justify-content: unset;
    float: right;
    margin-left: 1rem;
  }

  .public-DraftStyleDefault-block {
    margin: 0;
  }
`);
