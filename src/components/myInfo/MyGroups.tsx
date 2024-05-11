import { memo, PropsWithChildren, ReactElement } from 'react';

import { isEmpty } from '@nf-team/core';

import { InfiniteRefState, InfiniteResponse } from '@/models';
import { Group } from '@/models/group';
import { targetFalseThenValue } from '@/utils/utils';

import MyGroup from './MyGroup';
import MyGroupsSkeletonLoader, { MyGroupLayout } from './MyGroupsSkeletonLoader';

interface Props {
  groups: InfiniteResponse<Group>[];
  refState: InfiniteRefState<HTMLAnchorElement>;
  isLoading?: boolean;
}

function MyGroups({
  groups, refState, isLoading, children,
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
