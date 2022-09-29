import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

import { Group } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';
import { body1Font, body2Font } from '@/styles/fontStyles';
import mq from '@/styles/responsive';
import styledAnchor from '@/styles/styledAnchor';
import { filteredWithSanitizeHtml } from '@/utils/filter';
import rehypePrism from '@/utils/rehypePrism';

import AlertIcon from '../../assets/icons/alert.svg';
import Tag from '../common/Tag';

interface Props {
  group: Group;
  isGroupMember: boolean;
}

function DetailContentsSection({ group, isGroupMember }: Props): ReactElement {
  const { push } = useRouter();
  const setGroupsCondition = useSetRecoilState(groupsConditionState);
  const { content, tags, thumbnail } = group;

  const handleClickTag = (name: string) => {
    push('/');
    setGroupsCondition((prev) => ({
      ...prev,
      tag: name,
    }));
  };

  const convertedCleanHtml = filteredWithSanitizeHtml(unified()
    .use(rehypeParse)
    .use(rehypePrism)
    .use(rehypeStringify)
    .processSync(content)
    .toString());

  return (
    <DetailContentsWrapper>
      {isGroupMember && (
        <MemberMessageBlock>
          <AlertIcon />
            {group.message ? (
              <div>
                <MemberMessageTitle>
                  멤버들에게 보내는 메시지
                </MemberMessageTitle>
                <MemberMessage>{group.message}</MemberMessage>
              </div>
            ) : (
              <div>
                <MemberMessageTitle className="empty-message">
                  멤버들에게 보내는 메시지가 없어요.
                </MemberMessageTitle>
              </div>
            )}
        </MemberMessageBlock>
      )}
      {thumbnail && (
        <div className="post-thumbnail-wrapper">
          <img src={thumbnail} alt="글 썸네일 이미지" />
        </div>
      )}
      <DetailContentWrapper dangerouslySetInnerHTML={{ __html: convertedCleanHtml }} />
      <TagsWrapper>
        {tags.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            onClick={() => handleClickTag(tag)}
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
  ${mq({
    minHeight: ['260px', 'auto'],
  })};

  margin-bottom: 36px;

  p {
    ${body1Font()}
    ${styledAnchor}
    margin: 0;

    & > code {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
      background-color: ${({ theme }) => theme.accent2};
      border-radius: 6px;
    }
  }

  hr {
    border: .5px solid ${({ theme }) => theme.accent4}
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.accent3};
    margin-left: 0;
    margin-right: 0;
    padding-left: 15px;

    & p {
      color: ${({ theme }) => theme.accent5}
    }
  }
`;

const DetailContentsWrapper = styled.div`
  border-bottom: 0.5px solid ${({ theme }) => theme.accent2};
  padding-bottom: 40px;
  margin-bottom: 24px;

  & > .post-thumbnail-wrapper {
    width: 100%;

    & > img {
      display: block;
      margin: 2rem auto;
      max-width: 100%;
      height: auto;
    }
  }
`;

const MemberMessageBlock = styled.div`
  background: ${({ theme }) => theme.accent1};
  box-sizing: border-box;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;

  & > div {
    margin-left: 12px;
  }
`;

const MemberMessageTitle = styled.h6`
  ${body2Font(true)}
  color: ${({ theme }) => theme.foreground};
  margin: 0px 0px 4px 0px;

  &.empty-message {
    color: ${({ theme }) => theme.accent5};
    margin: 0px;
  }
`;

const MemberMessage = styled.div`
  ${body2Font()}
  white-space: pre;
  color: ${({ theme }) => theme.accent6};
  margin: 0px;
`;
