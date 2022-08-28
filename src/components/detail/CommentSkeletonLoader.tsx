import React from 'react';

import styled from '@emotion/styled';

import SkeletonItem from '../common/SkeletonItem';

function CommentSkeletonLoader() {
  return (
    <CommentsSkeletonWrapper data-testid="comments-skeleton-loading" title="loading...">
      {Array.from({ length: 6 }, (_, i) => (i)).map((key) => (
        <CommentSkeletonWrapper key={key}>
          <SkeletonItem
            styles={{
              width: '32px',
              height: '32px',
              minWidth: '32px',
              minHeight: '32px',
            }}
            circle
          />
          <CommentSkeleton>
            <div>
              <SkeletonItem
                styles={{
                  width: '100%',
                  maxWidth: '80px',
                  height: '20px',
                  margin: '3px 12px 3px 0',
                }}
              />
              <SkeletonItem
                styles={{
                  width: '80px',
                  maxWidth: '80px',
                  height: '16px',
                }}
              />
            </div>
            <SkeletonItem
              styles={{
                width: '100%',
                maxWidth: '240px',
                height: '16px',
              }}
            />
          </CommentSkeleton>
        </CommentSkeletonWrapper>
      ))}
    </CommentsSkeletonWrapper>
  );
}

export default CommentSkeletonLoader;

const CommentSkeleton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 12px;

  & > div:first-of-type {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 11px;
  }
`;

const CommentSkeletonWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 0.5px solid ${({ theme }) => theme.accent2};
`;

const CommentsSkeletonWrapper = styled.div`
  & > div:last-of-type {
    border-bottom: none;
    margin-bottom: 50px;
  }
`;
