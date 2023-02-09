import { memo, ReactElement, useCallback } from 'react';

import Tag from '../common/Tag';

interface Props {
  onRemove: (tags: string[]) => void;
  tags: string[];
}

function TagList({ onRemove, tags }: Props): ReactElement {
  const handleRemove = useCallback((target: string) => {
    const nextTags = tags.filter((tag) => tag !== target);

    onRemove(nextTags);
  }, [tags, onRemove]);

  return (
    <>
      {tags.map((tag) => (
        <Tag
          key={tag}
          tag={tag}
          onRemove={() => handleRemove(tag)}
        />
      ))}
    </>
  );
}

export default memo(TagList);
