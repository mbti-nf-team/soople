import React, { ReactElement } from 'react';

import DetailContentsSection from '@/components/detail/DetailContentsSection';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';

function DetailContentsContainer(): ReactElement {
  const { data: group } = useFetchGroup();

  return (
    <DetailContentsSection
      group={group}
    />
  );
}

export default DetailContentsContainer;
