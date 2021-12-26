import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { signOut } from 'next-auth/client';

import palette from '../../styles/palette';

interface Props {
  isVisible: boolean;
}

function DropDown({ isVisible }: Props):ReactElement | null {
  if (!isVisible) {
    return null;
  }

  return (
    <DropDownWrapper>
      <div className="menu-wrapper">
        <MenuContent>
          내 정보
        </MenuContent>
        <MenuContent
          onClick={() => signOut()}
        >
          로그아웃
        </MenuContent>
      </div>
    </DropDownWrapper>
  );
}

export default DropDown;

const DropDownWrapper = styled.div`
  position: absolute;
  top: 100%;

  .menu-wrapper {
    position: relative;
    z-index: 5;
    width: 10rem;
    background: ${palette.accent2};
    box-shadow: rgb(0 0 0 / 20%) 0px 0px 8px;
  }
`;

const MenuContent = styled.div`
  color: ${palette.foreground};
  padding: 0.75rem 1rem;
  line-height: 1.5;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .2s;
  
  &:hover {
    background: ${palette.accent3};
  }
`;
