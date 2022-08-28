import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import { Group } from '@/models/group';
import { isEmpty } from '@/utils/utils';

import EmptyFrameSvg from '../../assets/icons/empty-frame.svg';
import EmptyStateArea from '../common/EmptyStateArea';

import RecruitPost from './RecruitPost';

interface Props {
  groups: Group[];
  onClickEmptyButton: () => void;
}

function RecruitPosts({ groups, onClickEmptyButton }: Props): ReactElement {
  if (isEmpty(groups)) {
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
    <RecruitPostsWrapper>
      {groups.map((group) => (
        <RecruitPost
          key={group.groupId}
          group={group}
        />
      ))}
    </RecruitPostsWrapper>
  );
}

export default memo(RecruitPosts);

export const RecruitPostsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -0.625rem;
`;
