import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import DetailHeaderSection from '@/components/detail/DetailHeaderSection';
import useCurrentTime from '@/hooks/useCurrentTime';
import { getGroup } from '@/utils/utils';

function DetailHeaderContainer(): ReactElement | null {
  const currentTime = useCurrentTime();
  const group = useSelector(getGroup('group'));

  if (!group) {
    return null;
  }

  return (
    <DetailHeaderSection
      group={group}
      currentTime={currentTime}
    />
  );
}

export default DetailHeaderContainer;
