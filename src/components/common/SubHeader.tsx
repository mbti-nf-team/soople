/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PropsWithChildren, ReactElement } from 'react';
import { ChevronLeft } from 'react-feather';

import styled from '@emotion/styled';

import { h4Font } from '@/styles/fontStyles';
import Layout from '@/styles/Layout';
import zIndexes from '@/styles/zIndexes';

interface Props {
  previousText: string;
  goBack: () => void;
}

function SubHeader({ goBack, previousText, children }: PropsWithChildren<Props>): ReactElement {
  return (
    <>
      <HeaderBlock>
        <HeaderWrapper>
          <div>
            <ChevronLeft size={24} onClick={goBack} cursor="pointer" />
            <GoBackButton onClick={goBack} type="button">
              {previousText}
            </GoBackButton>
          </div>
          <div>
            {children}
          </div>
        </HeaderWrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default SubHeader;

const Spacer = styled.div`
  height: 4rem;
`;

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  z-index: ${zIndexes.TopNavigation};
  background: ${({ theme }) => theme.background};
`;

const HeaderWrapper = styled(Layout)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 4rem;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const GoBackButton = styled.button`
  ${h4Font(true)};
  background: transparent;
  color: ${({ theme }) => theme.foreground};
`;
