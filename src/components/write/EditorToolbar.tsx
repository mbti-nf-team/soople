import {
  ReactElement, UIEvent, useLayoutEffect, useRef, useState,
} from 'react';
import { ChevronRight } from 'react-feather';
import { useWindowSize } from 'react-use';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useActive, useChainedCommands } from '@remirror/react';

import useLessThenScrollY from '@/hooks/useLessThenScrollY';
import useResponsive from '@/hooks/useResponsive';
import Divider from '@/styles/Divider';
import mq, { mediaQueries } from '@/styles/responsive';

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
  const theme = useTheme();
  const active = useActive();
  const { width } = useWindowSize();
  const { isMobile } = useResponsive();
  const isLessThenScrollY = useLessThenScrollY(56);
  const {
    toggleBold, toggleHeading, toggleItalic, toggleStrike, toggleBlockquote,
    toggleCodeBlock, toggleBulletList, toggleOrderedList, toggleUnderline,
  } = useChainedCommands();

  const editorToolbarRef = useRef<HTMLDivElement>(null);
  const [toolbarScroll, setToolbarScroll] = useState<{
    scrollLeft: number; maximumHorizontalScroll: number;
  }>({
    scrollLeft: 0,
    maximumHorizontalScroll: 0,
  });

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

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollWidth, clientWidth, scrollLeft } = e.currentTarget;

    setToolbarScroll({
      maximumHorizontalScroll: scrollWidth - clientWidth,
      scrollLeft,
    });
  };

  useLayoutEffect(() => {
    if (isMobile && editorToolbarRef.current) {
      const { current } = editorToolbarRef;

      setToolbarScroll({
        scrollLeft: current.scrollLeft,
        maximumHorizontalScroll: current.scrollWidth - current.clientWidth,
      });
    }
  }, [isMobile, width]);

  return (
    <EditorToolbarWrapper
      isLessThenScrollY={isLessThenScrollY}
      onScroll={handleScroll}
      ref={editorToolbarRef}
      data-testid="editor-toolbar-wrapper"
    >
      {isMobile && (
        <LeftShadowBlock
          isHidden={toolbarScroll.scrollLeft <= 0}
          data-testid="left-shadow-block"
        >
          <div>
            <ChevronRightIcon size={16} color={theme.accent5} />
          </div>
        </LeftShadowBlock>
      )}
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

      {isMobile && (
        <RightShadowBlock
          isHidden={toolbarScroll.scrollLeft >= toolbarScroll.maximumHorizontalScroll}
          data-testid="right-shadow-block"
        >
          <div>
            <ChevronRightIcon size={16} color={theme.accent5} />
          </div>
        </RightShadowBlock>
      )}

    </EditorToolbarWrapper>
  );
}
export default EditorToolbar;

const EditorToolbarWrapper = styled.div<{ isLessThenScrollY: boolean; }>`
  ${mediaQueries[0]} {
    padding: 8px 16px;
    border: 1px solid ${({ theme }) => theme.accent1};
    border-radius: 8px;
    margin: 0px;
    position: unset;
    top: initial;
    box-shadow: none;
  }

  transition: box-shadow .2s ease-in-out;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.background};
  border: none;
  padding: 4px 0px;
  margin: 0px -16px;
  z-index: 1;
  position: sticky;
  box-shadow: 0 1px 0 0 ${({ isLessThenScrollY, theme }) => (isLessThenScrollY ? 'transparent' : theme.accent2)};
  top: 56px;

  & > button:first-of-type {
  ${mq({
    marginLeft: ['12px', 0],
  })};
  }

  & > button:last-of-type {
  ${mq({
    marginRight: ['12px', 0],
  })};
  }

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
  min-height: 16px;
  min-width: 1px;
`;

const ChevronRightIcon = styled(ChevronRight)`
  min-height: 16px;
  min-width: 16px;
  position: absolute;
  right: 8px;
  top: 12px;
`;

const shadowBlock = ({ isHidden }: { isHidden: boolean; }) => css`
  position: sticky;
  top: 0px;
  transition: opacity .2s ease-in-out, visibility .2s ease-in-out;
  opacity: ${isHidden && 0};
  visibility: ${isHidden && 'hidden'};

  & > div {
    position: absolute;
    top: -20px;
    width: 48px;
    height: 40px;
    background: linear-gradient(270deg, #FFFFFF 46.88%, rgba(255, 255, 255, 0) 100%);
  }
`;

const RightShadowBlock = styled.div<{ isHidden: boolean; }>`
  ${shadowBlock};
  right: 0px;

  & > div {
    right: 0px;
  }
`;

const LeftShadowBlock = styled.div<{ isHidden: boolean; }>`
  ${shadowBlock};
  left: 0px;

  & > div {
    left: 0px;
    transform: rotate(-180deg);
  }
`;
