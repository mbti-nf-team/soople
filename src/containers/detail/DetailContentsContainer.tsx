import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import DetailContentsSection from '@/components/detail/DetailContentsSection';
import { Group } from '@/models/group';
import { getGroup } from '@/utils/utils';

function DetailContentsContainer(): ReactElement | null {
  const group = useSelector(getGroup('group'));

  return (
    <DetailContentsSection
      group={group as Group}
    />
  );
}

export default DetailContentsContainer;
