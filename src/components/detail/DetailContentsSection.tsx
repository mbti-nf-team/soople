import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { Group } from '@/models/group';
import palette from '@/styles/palette';

import Tag from '../common/Tag';

interface Props {
  group: Group;
}

function DetailContentsSection({ group }: Props): ReactElement {
  const { content, tags } = group;

  return (
    <DetailContentsWrapper>
      <div>
        {content}
      </div>
      <TagsWrapper>
        {tags.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
          />
        ))}
      </TagsWrapper>
    </DetailContentsWrapper>
  );
}

export default DetailContentsSection;

const TagsWrapper = styled.div`
  div {
    margin-right: 8px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const DetailContentsWrapper = styled.div`
  border-bottom: 0.5px solid ${palette.accent2};
  padding-bottom: 40px;
  margin-bottom: 24px;
`;
