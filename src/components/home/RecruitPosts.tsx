import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import useInfiniteFetchGroups from '@/hooks/api/group/useInfiniteFetchGroups';
import { isEmpty, targetFalseThenValue } from '@/utils/utils';

import EmptyFrameSvg from '../../assets/icons/empty-frame.svg';
import EmptyStateArea from '../common/EmptyStateArea';

import RecruitPost from './RecruitPost';
import RecruitPostsSkeletonLoader from './RecruitPostsSkeletonLoader';

interface Props {
  onClickEmptyButton: () => void;
}

function RecruitPosts({ onClickEmptyButton }: Props): ReactElement {
  const { query, refState } = useInfiniteFetchGroups();

  if (isEmpty(query.data.pages) || isEmpty(query.data.pages?.[0].items)) {
    return (
      <EmptyStateArea
        emptyText={`모집 중인 팀이 없어요.
        새로운 팀을 모집해볼까요?`}
        buttonText="팀 모집하기"
        svg={<EmptyFrameSvg />}
        marginTop="80px"
        buttonColor="outlined"
        onClick={onClickEmptyButton}
      />
    );
  }

  return (
    <>
      <RecruitPostsWrapper>
        {query.data.pages.map(({ items }) => (
          items.map((group, index) => {
            const isLastItem = index === items.length - 1;

            return (
              <RecruitPost
                key={group.groupId}
                group={group}
                ref={targetFalseThenValue(!isLastItem)(refState.lastItemRef)}
              />
            );
          })
        ))}
      </RecruitPostsWrapper>
      {query.isFetchingNextPage && (
        <RecruitPostsSkeletonLoader length={8} />
      )}
    </>
  );
}

export default memo(RecruitPosts);

const RecruitPostsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -0.625rem;
`;
