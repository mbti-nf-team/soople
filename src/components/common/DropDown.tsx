import React, { memo, ReactElement } from 'react';

import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { body1Font, subtitle1Font, subtitle2Font } from '@/styles/fontStyles';

interface Props {
  isVisible: boolean;
  name?: string | null;
  email: string;
  numberAlertAlarms: number;
  signOut: () => void;
}

function DropDown({
  isVisible, name, email, numberAlertAlarms, signOut,
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
          <Link href="/alarm" passHref>
            <MyInfoMenu className="my-alarm">
              <div>내 알림</div>
              {!!numberAlertAlarms && (
                <AlertAlarmStatus data-testid="dropdown-alarm-status">
                  {numberAlertAlarms}
                </AlertAlarmStatus>
              )}
            </MyInfoMenu>
          </Link>
        </div>
        <Pipe />
        <div className="content-wrapper">
          <MenuContent
            onClick={signOut}
          >
            로그아웃
          </MenuContent>
        </div>
      </div>
    </DropDownWrapper>
  );
}

export default memo(DropDown);

const DropDownWrapper = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 0.25rem;
  right: 0;

  .menu-wrapper {
    position: relative;
    z-index: 5;
    min-width: 175px;
    background: ${({ theme }) => theme.background};
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px;
  }

  .content-wrapper {
    padding: 4px 0px;
  }
`;

const Pipe = styled.div`
  margin: 0;
  border-top: 1px solid ${({ theme }) => theme.accent2};
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
    color: ${({ theme }) => theme.accent5};
  }
`;

const navItem = ({ theme }: { theme: Theme }) => css`
  ${body1Font()};
  color: ${theme.foreground};
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color .2s;

  &:hover {
    background: ${theme.accent1};
  }
`;

const MenuContent = styled.div`
  ${navItem}
`;

const MyInfoMenu = styled.a`
  ${navItem}
  display: block;

  &.my-alarm {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const AlertAlarmStatus = styled.div`
  ${subtitle2Font(true)}
  text-align: center;
  background-color: ${({ theme }) => theme.warning};
  color: ${({ theme }) => theme.background};
  width: 16px;
  height: 16px;
  border-radius: 16px;
  margin-left: 4px;
`;
