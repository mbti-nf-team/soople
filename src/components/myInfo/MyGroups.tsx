import React, { memo, PropsWithChildren, ReactElement } from 'react';

import { InfiniteRefState, InfiniteResponse } from '@/models';
import { Group } from '@/models/group';
import { isEmpty, targetFalseThenValue } from '@/utils/utils';

import MyGroup from './MyGroup';
import MyGroupsSkeletonLoader, { MyGroupLayout } from './MyGroupsSkeletonLoader';

interface Props {
  groups: InfiniteResponse<Group>[];
  onClickGroup: (groupId: string) => void;
  refState: InfiniteRefState<HTMLDivElement>;
  isLoading?: boolean;
}

function MyGroups({
  groups, onClickGroup, refState, isLoading, children,
}: PropsWithChildren<Props>): ReactElement {
  if (isEmpty(groups) || isEmpty(groups[0].items)) {
    return <>{children}</>;
  }

  return (
    <>
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
      {isLoading && (
        <MyGroupsSkeletonLoader />
      )}
    </>
  );
}

export default memo(MyGroups);
