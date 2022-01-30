import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import { TagCount } from '@/models/group';

import Tag from '../common/Tag';

interface Props {
  tags: TagCount[];
  isLoading: boolean;
}

function TagsBar({ tags, isLoading }: Props): ReactElement {
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <TagsWrapper>
      {tags.map(({ name }) => (
        <Tag
          key={name}
          tag={name}
        />
      ))}
    </TagsWrapper>
  );
}

export default memo(TagsBar);

const TagsWrapper = styled.div`
  div {
    margin-right: 8px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
