import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import { Profile } from '@/models/auth';

import Button from './Button';
import HeaderWrapper from './HeaderWrapper';
import SkeletonItem from './SkeletonItem';
import UserNavbar from './UserNavbar';

interface Props {
  user: Profile | null
  onClick: () => void;
  signOut: () => void;
  isScrollTop: boolean;
  hasBackground: boolean;
  hasOnlyLogo: boolean;
  isLoading: boolean;
}

function Header({
  user, onClick, isScrollTop, signOut, hasBackground, hasOnlyLogo, isLoading,
}: Props): ReactElement {
  if (hasOnlyLogo) {
    return (
      <HeaderWrapper
        hasBackground={hasBackground}
        isScrollTop={isScrollTop}
        testId="only-logo-block"
      />
    );
  }

  if (isLoading) {
    return (
      <HeaderWrapper
        hasBackground={hasBackground}
        isScrollTop={isScrollTop}
        testId="header-block"
      >
        <LoaderWrapper title="loading-skeleton">
          <SkeletonItem
            styles={{
              width: '80px',
              height: '28px',
              margin: '0 16px 0 0',
              borderRadius: '6px',
            }}
          />
          <SkeletonItem
            styles={{
              width: '32px',
              height: '32px',
              minWidth: '32px',
              minHeight: '32px',
            }}
            circle
          />
        </LoaderWrapper>
      </HeaderWrapper>
    );
  }

  return (
    <HeaderWrapper
      hasBackground={hasBackground}
      isScrollTop={isScrollTop}
      testId="header-block"
    >
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
  );
}

export default memo(Header);

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
