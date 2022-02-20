import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import { Group } from '@/models/group';
import { body1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

import Tag from '../common/Tag';

interface Props {
  group: Group;
  isGroupMember: boolean;
}

function DetailContentsSection({ group, isGroupMember }: Props): ReactElement {
  const { content, tags } = group;

  return (
    <DetailContentsWrapper>
      {isGroupMember && (
        <MemberMessageBlock>
          <h6>멤버들에게 보내는 메시지</h6>
          <p>
            {group.message}
          </p>
        </MemberMessageBlock>
      )}
      <DetailContentWrapper dangerouslySetInnerHTML={{ __html: content }} />
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

export default memo(DetailContentsSection);

const TagsWrapper = styled.div`
  div {
    margin-right: 8px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const DetailContentWrapper = styled.div`
  margin-bottom: 36px;
`;

const DetailContentsWrapper = styled.div`
  border-bottom: 0.5px solid ${palette.accent2};
  padding-bottom: 40px;
  margin-bottom: 24px;
`;

const MemberMessageBlock = styled.div`
  min-height: 166px;
  border: 1px solid ${palette.accent2};
  box-sizing: border-box;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 43px;

  & > h6 {
    ${body1Font(true)}
    color: ${palette.foreground};
    margin: 0px;
  }

  & > p {
    ${body1Font()}
    margin: 12px 0 0 0;
    color: ${palette.accent6};
  }
`;
