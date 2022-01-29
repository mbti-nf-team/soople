import React, { PropsWithChildren, ReactElement } from 'react';

import styled from '@emotion/styled';
import * as R from 'ramda';

import { Group } from '@/models/group';
import { DetailLayout } from '@/styles/Layout';
import palette from '@/styles/palette';

import MyGroup from './MyGroup';

interface Props {
  groups: Group[];
  onClickGroup: (groupId: string) => void;
}

function MyGroups({
  groups, onClickGroup, children,
}: PropsWithChildren<Props>): ReactElement {
  if (R.isEmpty(groups)) {
    return <>{children}</>;
  }

  return (
    <MyGroupLayout>
      {groups.map((group) => (
        <MyGroup
          key={group.groupId}
          group={group}
          onClick={onClickGroup}
        />
      ))}
    </MyGroupLayout>
  );
}

export default MyGroups;

const MyGroupLayout = styled(DetailLayout)`
  & > :not(div:last-of-type) {
    padding-bottom: 24px;
    border-bottom: 0.5px solid ${palette.accent2};
  }
`;
