import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import DetailHeaderSection from '@/components/detail/DetailHeaderSection';
import { getGroup } from '@/utils/utils';

function DetailHeaderContainer(): ReactElement | null {
  const group = useSelector(getGroup('group'));

  if (!group) {
    return null;
  }

  return (
    <DetailHeaderSection
      group={group}
    />
  );
}

export default DetailHeaderContainer;
