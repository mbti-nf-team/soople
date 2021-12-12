import React, { ReactElement } from 'react';

import { Group } from '@/models/group';

interface Props {
  group: Group
}

function DetailContentsSection({ group }: Props): ReactElement {
  const { contents, tags } = group;

  return (
    <div>
      <div>
        {contents}
      </div>
      <div>
        {tags.map((tag) => (
          <span key={tag}>{`#${tag}`}</span>
        ))}
      </div>
    </div>
  );
}

export default DetailContentsSection;
