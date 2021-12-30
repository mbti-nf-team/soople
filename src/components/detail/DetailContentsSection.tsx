import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { Group } from '@/models/group';

import Tag from '../common/Tag';

interface Props {
  group: Group;
}

function DetailContentsSection({ group }: Props): ReactElement {
  const { content, tags } = group;

  return (
    <div>
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
    </div>
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
