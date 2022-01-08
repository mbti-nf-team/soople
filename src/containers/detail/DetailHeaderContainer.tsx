import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import DetailHeaderSection from '@/components/detail/DetailHeaderSection';
import useCurrentTime from '@/hooks/useCurrentTime';
import { Group } from '@/models/group';
import { getAuth, getGroup } from '@/utils/utils';

function DetailHeaderContainer(): ReactElement | null {
  const group = useSelector(getGroup('group')) as Group;
  const user = useSelector(getAuth('user'));
  const currentTime = useCurrentTime(group.isCompleted);

  return (
    <DetailHeaderSection
      user={user}
      group={group}
      currentTime={currentTime}
    />
  );
}

export default DetailHeaderContainer;
