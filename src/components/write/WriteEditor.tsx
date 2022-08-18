import React, { ReactElement, useState } from 'react';
import { X as CloseIcon } from 'react-feather';

import styled from '@emotion/styled';
import { EditorComponent } from '@remirror/react';
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
import { body1Font, subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

import AlertTriangleIcon from '../../assets/icons/alert_triangle.svg';

function WriteEditor(): ReactElement {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <>
      <EditorToolbar />
      {isVisible && (
        <WarningMessage>
          <div>
            <AlertTriangleIcon />
            <div>
              글 내용에 오픈 채팅방 또는 메신저 URL이 포함되지 않았는지 확인해주세요.
              <br />
              모집 완료 후 같은 팀 멤버들에게만 오픈 채팅방 URL을 보낼 수 있어요.
            </div>
          </div>
          <CloseIcon
            width={16}
            height={16}
            color={palette.accent5}
            cursor="pointer"
            onClick={() => setIsVisible(false)}
            data-testid="close-icon"
          />
        </WarningMessage>
      )}
      <RemirrorEditorWrapper>
        <EditorComponent />
      </RemirrorEditorWrapper>
    </>
  );
}

export default WriteEditor;

const WarningMessage = styled.div`
  ${subtitle1Font()};
  background: ${palette.accent1};
  color: ${palette.foreground};
  border-radius: 8px;
  padding: 12px;
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    & > svg {
      margin-right: 12px;
      margin-top: 4px;
    }
  }
`;

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

  p, ol, li, a, strong, em, u, s, blockquote, h1, h2, h3, h4, h5, h6, pre, code, span {
    &::selection {
      background-color: #B4D5FE !important;
    }
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

  /* p::selection {
    background-color: #B4D5FE !important;
  } 
  
  p.selection {
    background-color: #B4D5FE !important;
  } */

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
