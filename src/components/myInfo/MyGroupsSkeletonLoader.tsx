import React, { memo, ReactElement } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import mq, { mobileMediaQuery } from '@/styles/responsive';

import SkeletonItem from '../common/SkeletonItem';

function MyGroupsSkeletonLoader(): ReactElement {
  return (
    <MyGroupLayout data-testid="skeleton-loader">
      {Array.from({ length: 7 }, (_, i) => (i)).map((key) => (
        <MyGroupsSkeletonItemWrapper key={key}>
          <div style={{
            width: '100%',
          }}
          >
            <SkeletonItem
              styles={{
                width: '160px',
                height: '28px',
                margin: '0 0 10px 0',
              }}
            />
            <SkeletonItem
              serializedStyles={css`
                ${mobileMediaQuery} {
                  width: 100%;
                }

                width: 100%;
                max-width: 320px;
                height: 20px;
                margin: 0 0 26px 0;
              `}
            />
            <SkeletonItem
              styles={{
                width: '120px',
                height: '14px',
              }}
            />
          </div>
          <SkeletonItem
            serializedStyles={css`
              ${mobileMediaQuery} {
                margin-top: 24px;
                width: 100%;
                height: 100%;
                min-width: 280px;
                min-height: 154px;
                margin-left: 0px;
              }

              min-width: 174px;
              width: 174px;
              height: 96px;
              margin-left: 24px;
            `}
          />
        </MyGroupsSkeletonItemWrapper>
      ))}
    </MyGroupLayout>
  );
}

export default memo(MyGroupsSkeletonLoader);

const MyGroupsSkeletonItemWrapper = styled.div`
  ${mq({
    flexDirection: ['column', 'row'],
  })};

  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

export const MyGroupLayout = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 686px;
  width: calc(100% - 3rem);
  
  & > :not(:first-of-type) {
    padding-top: 24px;
  }

  & > :not(:last-of-type) {
    padding-bottom: 24px;
    border-bottom: 0.5px solid ${({ theme }) => theme.accent2};
  }

  & > :first-of-type {
  ${mq({
    paddingTop: ['24px', '40px'],
  })};
  }

  & > :last-of-type {
  ${mq({
    paddingBottom: ['24px', '40px'],
  })};
  }
`;
