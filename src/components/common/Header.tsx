import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import Link from 'next/link';
import { Session } from 'next-auth';

import Layout from '@/styles/Layout';
import palette from '@/styles/palette';
import zIndexes from '@/styles/zIndexes';

import LogoSvg from '../../assets/icons/img_logo_conners.svg';

import Button from './Button';
import UserNavbar from './UserNavbar';

interface Props {
  session: Session | null
  onClick: () => void;
  isScrollTop: boolean;
}

function Header({ session, onClick, isScrollTop }: Props): ReactElement {
  return (
    <>
      <HeaderBlock isScrollTop={isScrollTop} data-testid="header-block">
        <HeaderWrapper>
          <Link href="/" passHref>
            <a>
              <LogoIcon />
            </a>
          </Link>
          {session ? (
            <UserNavbar
              userImage={session.user.image}
            />
          ) : (
            <Button
              color="primary"
              size="small"
              type="button"
              onClick={onClick}
            >
              시작하기
            </Button>
          )}
        </HeaderWrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default Header;

const LogoIcon = styled(LogoSvg)`
  width: 100px;
  height: 20px;
`;

const HeaderBlock = styled.div<{isScrollTop: boolean }>`
  position: fixed;
  width: 100%;
  z-index: ${zIndexes.TopNavigation};
  background: ${palette.accent1};
  box-shadow: inset 0 -1px 0 0 ${({ isScrollTop }) => (isScrollTop ? 'transparent' : palette.accent4)};
  transition: box-shadow .2s ease-in-out;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const HeaderWrapper = styled(Layout)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;
