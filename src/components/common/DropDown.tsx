import React, { ReactElement } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { body1Font, subtitle1Font } from '@/styles/fontStyles';

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
        <div className="content-wrapper">
          <UserState>
            <div className="user-name">{name}</div>
            <div className="user-email">{email}</div>
          </UserState>
          <Link href="/myinfo/setting" passHref>
            <MyInfoMenu>내 정보</MyInfoMenu>
          </Link>
        </div>
        <Pipe />
        <div className="content-wrapper">
          <MenuContent
            className="logout-menu"
            onClick={signOut}
          >
            로그아웃
          </MenuContent>
        </div>
      </div>
    </DropDownWrapper>
  );
}

export default DropDown;

const DropDownWrapper = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 0.25rem;
  right: 0;

  .menu-wrapper {
    position: relative;
    z-index: 5;
    min-width: 175px;
    background: ${palette.background};
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px;
  }

  .content-wrapper {
    padding: 4px 0px;
  }
`;

const Pipe = styled.div`
  margin: 0;
  border-top: 1px solid ${palette.accent2};
`;

const UserState = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 40px 8px 16px;
  justify-content: flex-start;

  .user-name {
    ${body1Font(true)};
  }

  .user-email {
    ${subtitle1Font()};
    color: ${palette.accent5};
  }
`;

const navItem = css`
  ${body1Font()};
  color: ${palette.foreground};
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color .2s;

  &:hover {
    background: ${palette.accent1};
  }
`;

const MenuContent = styled.div`
  ${navItem}
  
  &.logout-menu {
  }
`;

const MyInfoMenu = styled.a`
  ${navItem}
  display: block;
`;
