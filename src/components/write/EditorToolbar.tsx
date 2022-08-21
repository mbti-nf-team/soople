import React, { ReactElement } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useActive, useChainedCommands } from '@remirror/react';

import Divider from '@/styles/Divider';

import BoldIcon from '../../assets/icons/editor_b.svg';
import BlockquoteIcon from '../../assets/icons/editor_blockquote.svg';
import BulletListIcon from '../../assets/icons/editor_bulleted_list.svg';
import CodeBlockIcon from '../../assets/icons/editor_code.svg';
import StrikeIcon from '../../assets/icons/editor_del.svg';
import H1Icon from '../../assets/icons/editor_h1.svg';
import H2Icon from '../../assets/icons/editor_h2.svg';
import H3Icon from '../../assets/icons/editor_h3.svg';
import ImageIcon from '../../assets/icons/editor_image.svg';
import ItalicIcon from '../../assets/icons/editor_italic.svg';
import LinkIcon from '../../assets/icons/editor_link.svg';
import OrderedListIcon from '../../assets/icons/editor_ordered_list.svg';
import UnderlineIcon from '../../assets/icons/editor_underline.svg';

function EditorToolbar(): ReactElement {
  const active = useActive();
  const {
    toggleBold, toggleHeading, toggleItalic, toggleStrike, toggleBlockquote,
    toggleCodeBlock, toggleBulletList, toggleOrderedList, toggleUnderline,
  } = useChainedCommands();

  const handleBoldClick = () => toggleBold().focus().run();

  const handleHeadingClick = (level: number) => toggleHeading({ level }).focus().run();

  const handleItalicClick = () => toggleItalic().focus().run();

  const handleUnderlineClick = () => toggleUnderline().focus().run();

  const handleStrikeClick = () => toggleStrike().focus().run();

  const handleBlockquoteClick = () => toggleBlockquote().focus().run();

  const handleCodeBlockClick = () => toggleCodeBlock({ language: 'typescript' }).focus().run();

  const handleBulletListClick = () => toggleBulletList().focus().run();

  const handleOrderedListClick = () => toggleOrderedList().focus().run();

  const isActiveHeading = (level: number) => active.heading({ level });

  return (
    <EditorToolbarWrapper>
      <ToolbarItemButton
        type="button"
        onClick={() => handleHeadingClick(1)}
        active={isActiveHeading(1)}
        data-testid="h1-button"
      >
        <H1Icon className="heading-icon" />
      </ToolbarItemButton>

      <ToolbarItemButton
        type="button"
        onClick={() => handleHeadingClick(2)}
        active={isActiveHeading(2)}
        data-testid="h2-button"
      >
        <H2Icon className="heading-icon" />
      </ToolbarItemButton>

      <ToolbarItemButton
        type="button"
        onClick={() => handleHeadingClick(3)}
        active={isActiveHeading(3)}
        data-testid="h3-button"
      >
        <H3Icon className="heading-icon" />
      </ToolbarItemButton>

      <ToolbarItemDivider />

      <ToolbarItemButton
        type="button"
        onClick={handleBoldClick}
        active={active.bold()}
        data-testid="bold-button"
      >
        <BoldIcon className="toolbar-icon" />
      </ToolbarItemButton>

      <ToolbarItemButton
        type="button"
        onClick={handleItalicClick}
        active={active.italic()}
        data-testid="italic-button"
      >
        <ItalicIcon className="toolbar-icon" />
      </ToolbarItemButton>

      <ToolbarItemButton
        type="button"
        onClick={handleUnderlineClick}
        active={active.underline()}
        data-testid="underline-button"
      >
        <UnderlineIcon className="toolbar-icon" />
      </ToolbarItemButton>

      <ToolbarItemButton
        type="button"
        onClick={handleStrikeClick}
        active={active.strike()}
        data-testid="strike-button"
      >
        <StrikeIcon className="strike-icon" />
      </ToolbarItemButton>

      <ToolbarItemButton
        type="button"
        onClick={handleBlockquoteClick}
        active={active.blockquote()}
        data-testid="blockquote-button"
      >
        <BlockquoteIcon className="blockquote-icon" />
      </ToolbarItemButton>

      <ToolbarItemButton
        type="button"
        onClick={handleCodeBlockClick}
        active={active.codeBlock()}
        data-testid="code-block-button"
      >
        <CodeBlockIcon className="toolbar-icon" />
      </ToolbarItemButton>

      <ToolbarItemDivider />

      <ToolbarItemButton
        type="button"
        onClick={handleBulletListClick}
        active={active.bulletList()}
        data-testid="bullet-list-button"
      >
        <BulletListIcon className="toolbar-icon" />
      </ToolbarItemButton>

      <ToolbarItemButton
        type="button"
        onClick={handleOrderedListClick}
        active={active.orderedList()}
        data-testid="ordered-list-button"
      >
        <OrderedListIcon className="ordered-list-icon" />
      </ToolbarItemButton>

      <ToolbarItemDivider />
      <ToolbarItemButton
        type="button"
        active={active.link()}
        data-testid="link-button"
      >
        <LinkIcon className="toolbar-icon" />
      </ToolbarItemButton>

      <ToolbarItemButton
        type="button"
        active={active.image()}
        data-testid="image-button"
      >
        <ImageIcon className="toolbar-icon" />
      </ToolbarItemButton>
    </EditorToolbarWrapper>
  );
}
export default EditorToolbar;

const EditorToolbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.accent1};
  padding: 8px 16px;
  border-radius: 8px;

  & > button:not(button:last-of-type) {
    margin-right: 8px;
  }
`;

const ToolbarItemButton = styled.button<{ active: boolean; }>`
  padding: 8px;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  transition: background-color .1s ease-in-out;
  background: ${({ theme }) => theme.background};

  ${({ active, theme }) => active && css`
    & >.toolbar-icon > path {
        transition: stroke .1s ease-in-out;
        stroke: ${theme.success};
      }

    & >.strike-icon > path, >.blockquote-icon > path  {
      transition: fill .1s ease-in-out;
      fill: ${theme.success};
    }

    & >.ordered-list-icon {
      & > path:first-of-type, > path:nth-of-type(3) {
        transition: stroke .1s ease-in-out;
        stroke: ${theme.success};
      }

      & > path:last-of-type, > path:nth-of-type(2) {
        transition: fill .1s ease-in-out;
        fill: ${theme.success};
      }
    }

    & >.heading-icon {
      & > path:first-of-type {
        transition: stroke .1s ease-in-out;
        stroke: ${theme.success};
      }

      & > path:last-of-type {
        transition: fill .1s ease-in-out;
        fill: ${theme.success};
      }
    }
  `}

  &:focus, :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const ToolbarItemDivider = styled(Divider)`
  height: 16px;
`;
