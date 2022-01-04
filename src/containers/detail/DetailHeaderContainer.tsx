import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import DetailHeaderSection from '@/components/detail/DetailHeaderSection';
import useCurrentTime from '@/hooks/useCurrentTime';
import { getAuth, getGroup } from '@/utils/utils';

function DetailHeaderContainer(): ReactElement | null {
  const currentTime = useCurrentTime();
  const group = useSelector(getGroup('group'));
  const user = useSelector(getAuth('user'));

  if (!group) {
    return null;
  }

  return (
    <DetailHeaderSection
      user={user}
      group={group}
      currentTime={currentTime}
    />
  );
}

export default DetailHeaderContainer;
