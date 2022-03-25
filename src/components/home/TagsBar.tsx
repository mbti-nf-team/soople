import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';
import { nanoid } from 'nanoid';
import { useSetRecoilState } from 'recoil';

import { TagCount } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';

import SkeletonItem from '../common/SkeletonItem';
import Tag from '../common/Tag';

interface Props {
  tags: TagCount[];
  isLoading: boolean;
}

function TagsBar({ tags, isLoading }: Props): ReactElement {
  const setGroupsCondition = useSetRecoilState(groupsConditionState);

  if (isLoading) {
    return (
      <TagsWrapper title="loading..." data-testid="loading-skeleton">
        {['80px', '120px', '80px', '80px', '120px', '64px'].map((width) => (
          <SkeletonItem key={nanoid()} height="36px" width={width} borderRadius="6px" />
        ))}
      </TagsWrapper>
    );
  }

  return (
    <TagsWrapper>
      {tags.map(({ name }) => (
        <Tag
          key={name}
          tag={name}
          onClick={() => setGroupsCondition((prev) => ({
            ...prev,
            tag: name,
          }))}
        />
      ))}
    </TagsWrapper>
  );
}

export default memo(TagsBar);

const TagsWrapper = styled.div`
  height: 36px;
  overflow: hidden;

  & > :not(:last-of-type) {
    margin-right: 8px;
  }
`;
