import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import DetailHeaderSection from '@/components/detail/DetailHeaderSection';
import { getGroup } from '@/utils/utils';

function DetailHeaderContainer(): ReactElement | null {
  const group = useSelector(getGroup('group'));
  const writer = useSelector(getGroup('writer'));

  if (!group || !writer) {
    return null;
  }

  return (
    <DetailHeaderSection
      group={group}
      writer={writer}
    />
  );
}

export default DetailHeaderContainer;
