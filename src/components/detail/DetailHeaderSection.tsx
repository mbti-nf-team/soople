import React, { ReactElement } from 'react';

import { Group } from '@/models/group';

interface Props {
  group: Group
}

function DetailHeaderSection({ group }: Props): ReactElement {
  const { title } = group;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

export default DetailHeaderSection;
