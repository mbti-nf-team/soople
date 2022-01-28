import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import * as R from 'ramda';

import { Group } from '@/models/group';
import { DetailLayout } from '@/styles/Layout';
import palette from '@/styles/palette';

import EmptyStateArea from '../common/EmptyStateArea';

import RecruitedPost from './RecruitedPost';

interface Props {
  groups: Group[];
  onClickGroup: (groupId: string) => void;
}

function RecruitedPosts({ groups, onClickGroup }: Props): ReactElement {
  if (R.isEmpty(groups)) {
    return (
      <EmptyStateArea
        emptyText="모집한 팀이 없어요."
        buttonText="팀 모집하기"
        href="/write"
        marginTop="80px"
      />
    );
  }

  return (
    <RecruitedPostLayout>
      {groups.map((group) => (
        <RecruitedPost
          key={group.groupId}
          group={group}
          onClick={onClickGroup}
        />
      ))}
    </RecruitedPostLayout>
  );
}

export default RecruitedPosts;

const RecruitedPostLayout = styled(DetailLayout)`
  & > :not(div:last-of-type) {
    padding-bottom: 24px;
    border-bottom: 0.5px solid ${palette.accent2};
  }
`;
