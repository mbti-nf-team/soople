import React, { ReactElement } from 'react';

interface Props {
  onRemove: (tags: string[]) => void;
  tags: string[];
}

function TagList({ onRemove, tags }: Props): ReactElement {
  const handleRemove = (target: string) => {
    const nextTags = tags.filter((tag) => tag !== target);

    onRemove(nextTags);
  };

  return (
    <>
      {tags.map((tag) => (
        <div key={tag}>
          {`#${tag}`}
          <button type="button" onClick={() => handleRemove(tag)}>x</button>
        </div>
      ))}
    </>
  );
}

export default TagList;
