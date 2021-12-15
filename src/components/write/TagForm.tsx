import React, {
  ChangeEvent, KeyboardEvent, ReactElement, useCallback, useEffect, useState,
} from 'react';

import TagList from './TagList';

interface Props {
  tags: string[];
  onChange: (tags: string[]) => void;
}

function TagForm({ tags: initialTags, onChange }: Props): ReactElement {
  const [value, setValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>(initialTags);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const insertTag = useCallback((tag: string) => {
    if (!tag || tags.includes(tag)) {
      return;
    }

    const newTags = [...tags, tag];

    setTags(newTags);
    onChange(newTags);
  }, [tags]);

  const actionKeyEvent = useCallback((e: KeyboardEvent<HTMLInputElement>, keys: string[]) => {
    if (keys.includes(e.key)) {
      e.preventDefault();
      insertTag(value.trim());
      setValue('');
    }
  }, [insertTag, value]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && value === '') {
      setTags(tags.slice(0, tags.length - 1));
      return;
    }

    actionKeyEvent(e, [',']);
  }, [value, actionKeyEvent, tags]);

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    actionKeyEvent(e, ['Enter']);
  }, [actionKeyEvent]);

  const handleRemove = (nextTags: string[]) => {
    setTags(nextTags);
    onChange(nextTags);
  };

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  return (
    <div>
      <div>태그</div>
      <TagList
        tags={tags}
        onRemove={handleRemove}
      />
      <input
        id="tag"
        type="text"
        placeholder="태그를 입력하세요"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
      />
      <div>
        태그를 입력하고 쉼표 또는 엔터를 입력하면 태그가 등록됩니다.
      </div>
    </div>
  );
}

export default TagForm;
