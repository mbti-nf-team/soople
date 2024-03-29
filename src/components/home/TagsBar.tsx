import { memo, ReactElement, useCallback } from 'react';

import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';

import useFetchTagsCount from '@/hooks/api/tagsCount/useFetchTagsCount';
import { groupsConditionState } from '@/recoil/group/atom';

import Tag from '../common/Tag';

function TagsBar(): ReactElement {
  const { data: tags } = useFetchTagsCount();

  const setGroupsCondition = useSetRecoilState(groupsConditionState);

  const onClick = useCallback((name: string) => setGroupsCondition((prev) => ({
    ...prev,
    tag: name,
  })), []);

  return (
    <TagsWrapper>
      {tags.map(({ name }) => (
        <Tag
          key={name}
          tag={name}
          onClick={() => onClick(name)}
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
