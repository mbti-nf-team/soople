/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PropsWithChildren, ReactElement } from 'react';
import { ChevronLeft } from 'react-feather';

import styled from '@emotion/styled';

import useActionKeyEvent from '@/hooks/useActionKeyEvent';
import { body1Font, h4Font } from '@/styles/fontStyles';
import Layout from '@/styles/Layout';
import mq, { mediaQueries } from '@/styles/responsive';
import zIndexes from '@/styles/zIndexes';

interface Props {
  previousText?: string;
  goBack: () => void;
}

function SubHeader({ goBack, previousText, children }: PropsWithChildren<Props>): ReactElement {
  const handleKeyDown = useActionKeyEvent<HTMLDivElement>('Enter', goBack);

  return (
    <>
      <HeaderBlock>
        <HeaderWrapper>
          <div
            role="button"
            tabIndex={0}
            onClick={goBack}
            onKeyDown={handleKeyDown}
            style={{
              cursor: 'pointer',
            }}
          >
            <GoBackIcon size={24} />
            <GoBackTitle isHidden={!previousText} data-testid="go-back-title">
              {previousText}
            </GoBackTitle>
          </div>
          <div style={{
            marginLeft: '40px',
          }}
          >
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
  ${mq({
    height: ['56px', '64px'],
  })};
`;

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  z-index: ${zIndexes.TopNavigation};
  background: ${({ theme }) => theme.background};
`;

const HeaderWrapper = styled(Layout)`
  ${mq({
    height: ['56px', '64px'],
  })};

  width: calc(100% - 2rem);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const GoBackTitle = styled.div<{ isHidden: boolean; }>`
  ${mediaQueries[0]} {
    ${h4Font(true)};
  }

  ${body1Font(true)};
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ isHidden }) => isHidden && 0};
  background: transparent;
  color: ${({ theme }) => theme.foreground};
  word-break: break-all;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const GoBackIcon = styled(ChevronLeft)`
  ${mq({
    marginRight: ['8px', '16px'],
  })};

  min-height: 24px;
  min-width: 24px;
`;
