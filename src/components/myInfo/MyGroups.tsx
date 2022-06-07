import React, { memo, PropsWithChildren, ReactElement } from 'react';

import styled from '@emotion/styled';
import { isEmpty } from 'ramda';

import { InfiniteRefState, InfiniteResponse } from '@/models';
import { Group } from '@/models/group';
import palette from '@/styles/palette';
import { mq2 } from '@/styles/responsive';
import { targetFalseThenValue } from '@/utils/utils';

import MyGroup from './MyGroup';

interface Props {
  groups: InfiniteResponse<Group>[];
  onClickGroup: (groupId: string) => void;
  refState: InfiniteRefState<HTMLDivElement>;
}

function MyGroups({
  groups, onClickGroup, refState, children,
}: PropsWithChildren<Props>): ReactElement {
  if (isEmpty(groups) || isEmpty(groups[0].items)) {
    return <>{children}</>;
  }

  return (
    <MyGroupLayout>
      {groups.map(({ items }) => (
        items.map((group, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <MyGroup
              key={group.groupId}
              group={group}
              onClick={onClickGroup}
              ref={targetFalseThenValue(!isLastItem)(refState.lastItemRef)}
            />
          );
        })
      ))}
    </MyGroupLayout>
  );
}

export default memo(MyGroups);

export const MyGroupLayout = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  ${mq2({
    width: ['calc(100% - 3rem)', '686px'],
  })};

  & > :first-of-type {
    padding-top : 40px;
  }

  & > :last-of-type {
    margin-bottom : 40px;
  }
  
  & > :not(div:first-of-type) {
    padding-top: 24px;
  }

  & > :not(div:last-of-type) {
    padding-bottom: 24px;
    border-bottom: 0.5px solid ${palette.accent2};
  }
`;
