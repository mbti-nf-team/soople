import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';
import Link from 'next/link';

import { Profile } from '@/models/auth';
import Layout from '@/styles/Layout';
import palette from '@/styles/palette';
import zIndexes from '@/styles/zIndexes';

import LogoSvg from '../../assets/icons/img_logo_conners.svg';

import Button from './Button';
import UserNavbar from './UserNavbar';

interface Props {
  user: Profile | null
  onClick: () => void;
  signOut: () => void;
  isScrollTop: boolean;
  isHome: boolean;
}

function Header({
  user, onClick, isScrollTop, signOut, isHome,
}: Props): ReactElement {
  return (
    <>
      <HeaderBlock isHome={isHome} isScrollTop={isScrollTop} data-testid="header-block">
        <HeaderWrapper>
          <Link href="/" passHref>
            <a>
              <LogoIcon />
            </a>
          </Link>
          {user ? (
            <UserNavbar
              signOut={signOut}
              user={user}
            />
          ) : (
            <Button
              color="success"
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

export default memo(Header);

const LogoIcon = styled(LogoSvg)`
  width: 96px;
  height: 24px;
`;

const HeaderBlock = styled.div<{ isHome: boolean; isScrollTop: boolean }>`
  position: fixed;
  width: 100%;
  z-index: ${zIndexes.TopNavigation};
  background: ${({ isHome }) => (isHome ? palette.accent1 : palette.background)};
  box-shadow: 0 1px 0 0 ${({ isScrollTop }) => (isScrollTop ? 'transparent' : palette.accent2)};
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
