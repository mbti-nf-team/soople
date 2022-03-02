import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { useActive, useChainedCommands } from '@remirror/react';

import palette from '@/styles/palette';

import BoldIcon from '../../assets/icons/editor_b.svg';

function EditorToolbar(): ReactElement {
  const chain = useChainedCommands();
  const active = useActive();

  const handleClick = () => chain
    .toggleBold()
    .focus()
    .run();

  return (
    <EditorToolbarWrapper>
      <ToolbarItemButton
        type="button"
        onClick={handleClick}
        active={active.bold()}
        data-testid="bold-button"
      >
        <BoldIcon />
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
  border: 1px solid ${palette.accent1};
  padding: 8px 16px;
  border-radius: 8px;
`;

const ToolbarItemButton = styled.button<{ active: boolean; }>`
  padding: 8px;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  transition: background-color .1s ease-in-out;
  background: ${({ active }) => (active ? 'rgba(0, 0, 0, 0.1)' : palette.background)};

  &:focus, :hover {
    & > svg > path {
      transition: stroke .1s ease-in-out;
      stroke: ${palette.success};
    }
  }
`;
