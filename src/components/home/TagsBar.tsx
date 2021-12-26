import React, { ReactElement } from 'react';

import { TagCount } from '@/models/group';

interface Props {
  tags: TagCount[];
}

function TagsBar({ tags }: Props): ReactElement {
  if (!tags.length) {
    return <>태그가 없어요!</>;
  }

  return (
    <div>
      {tags.map(({ name }) => (
        <span key={name}>{`#${name}`}</span>
      ))}
    </div>
  );
}

export default TagsBar;
