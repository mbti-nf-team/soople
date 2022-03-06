import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { EditorComponent, EmojiPopupComponent } from '@remirror/react';
import {
  CoreStyledComponent,
  extensionEmojiStyledCss,
  extensionGapCursorStyledCss,
  extensionImageStyledCss,
  extensionListStyledCss,
  extensionPlaceholderStyledCss,
  extensionPositionerStyledCss,
  extensionWhitespaceStyledCss,
} from '@remirror/styles/emotion';

import EditorToolbar from '@/components/write/EditorToolbar';
import { body1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

function WriteEditor(): ReactElement {
  return (
    <>
      <EditorToolbar />
      <RemirrorEditorWrapper>
        <EmojiPopupComponent />
        <EditorComponent />
      </RemirrorEditorWrapper>
    </>
  );
}

export default WriteEditor;

const RemirrorEditorWrapper = styled(CoreStyledComponent)`
  ${extensionListStyledCss}
  ${extensionGapCursorStyledCss}
  ${extensionImageStyledCss}
  ${extensionPlaceholderStyledCss}
  ${extensionEmojiStyledCss}
  ${extensionWhitespaceStyledCss}
  ${extensionPositionerStyledCss}
  border-bottom: 1px solid ${palette.accent2};
  margin-bottom: 24px;

  p, ol, li, a {
    ${body1Font()}
  }

  p {
    margin: 0;
  }

  a {
    color: ${palette.success10};
  }

  p > code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: ${palette.accent2};
    border-radius: 6px;
  }

  .ProseMirror hr {
    border: .5px solid ${palette.accent4} !important;
  }

  .ProseMirror blockquote {
    border-left: 4px solid ${palette.accent3};
    margin-left: 0;
    margin-right: 0;
    padding-left: 15px;

    & p {
      color: ${palette.accent5}
    }
  }

  .ProseMirror ::selection {
    background-color: #B4D5FE !important;
  } 
  
  .ProseMirror .selection {
    background-color: #B4D5FE !important;
  }

  .remirror-is-empty:first-of-type::before {
    ${body1Font()}
    font-style: normal;
    color: ${palette.accent4};
  }

  .remirror-emoji-popup-highlight {
    background-color: ${palette.accent1};
  }

  & >.remirror-editor-wrapper {
    min-height: 258px;
    margin: 24px 0px;
  }

  .remirror-editor {
    ${body1Font()}
    min-height: 258px;
    outline: none;

    &:focus-visible {
      outline: none;
    }
  }
`;
