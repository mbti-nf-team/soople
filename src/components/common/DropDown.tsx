import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import palette from '../../styles/palette';

interface Props {
  isVisible: boolean;
  name?: string | null;
  email: string;
  signOut: () => void;
}

function DropDown({
  isVisible, name, email, signOut,
}: Props):ReactElement | null {
  if (!isVisible) {
    return null;
  }

  return (
    <DropDownWrapper>
      <div className="menu-wrapper">
        <UserState>
          <div className="user-name">{name}</div>
          <div className="user-email">{email}</div>
        </UserState>
        <MenuContent>
          내 정보
        </MenuContent>
        <Pipe />
        <MenuContent
          className="logout-menu"
          onClick={signOut}
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
  margin-top: 0.2rem;
  right: 0;

  .menu-wrapper {
    position: relative;
    z-index: 5;
    min-width: 175px;
    background: ${palette.background};
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px;
  }
`;

const Pipe = styled.div`
  margin: 4px 0;
  border-top: 1px solid ${palette.accent2};
`;

const UserState = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 40px 8px 16px;
  justify-content: flex-start;

  .user-name {
    font-size: 15px;
    font-weight: 600;
    line-height: 24px;
  }

  .user-email {
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: ${palette.accent5};
  }
`;

const MenuContent = styled.div`
  color: ${palette.foreground};
  padding: 0.6rem 1rem;
  font-size: 15px;
  line-height: 24px;
  font-weight: normal;
  cursor: pointer;
  transition: background-color .2s;
  
  &.logout-menu {
    padding-bottom: 0.875rem;
  }

  &:hover {
    background: ${palette.accent1};
  }
`;
