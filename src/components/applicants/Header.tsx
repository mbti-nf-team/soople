/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement } from 'react';
import { ChevronLeft } from 'react-feather';

import styled from '@emotion/styled';
import Link from 'next/link';

import Layout from '@/styles/Layout';
import palette from '@/styles/palette';
import zIndexes from '@/styles/zIndexes';

import Button from '../common/Button';

function Header(): ReactElement {
  return (
    <>
      <HeaderBlock>
        <HeaderWrapper>
          <Link href="#" passHref>
            <a>
              <ChevronLeft size={24} />
            </a>
          </Link>
          <div>
            <Button type="button" size="small" color="success">
              모집 완료
            </Button>
          </div>
        </HeaderWrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default Header;

const Spacer = styled.div`
  height: 4rem;
`;

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  z-index: ${zIndexes.TopNavigation};
  background: ${palette.background};
`;

const HeaderWrapper = styled(Layout)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;
