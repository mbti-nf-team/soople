import React, { ReactElement } from 'react';

import { Group } from '@/models/group';

interface Props {
  group: Group;
}

function DetailContentsSection({ group }: Props): ReactElement {
  const { content, tags } = group;

  return (
    <div>
      <div>
        {content}
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
