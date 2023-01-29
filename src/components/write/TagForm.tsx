import {
  ChangeEvent, KeyboardEvent, ReactElement, useCallback, useEffect, useState,
} from 'react';

import styled from '@emotion/styled';

import { body1Font, body2Font, subtitle1Font } from '@/styles/fontStyles';

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
    <TagFormWrapper>
      <div className="title">태그</div>
      <TagsWrapper isHaveTag={!!tags.length}>
        <TagList
          tags={tags}
          onRemove={handleRemove}
        />
        <TagInput
          id="tag"
          type="text"
          placeholder="태그를 입력하세요"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
          autoComplete="off"
          isHaveTag={!!tags.length}
        />
      </TagsWrapper>
      <div className="tag-tip">
        태그를 입력하고 쉼표 또는 엔터를 입력하면 태그가 등록됩니다.
      </div>
    </TagFormWrapper>
  );
}

export default TagForm;

const TagFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .title {
    ${body2Font(true)};
    margin-left: 4px;
    color: ${({ theme }) => theme.accent6};
    transition: color 0.1s ease-in-out;
  }

  .tag-tip {
    ${subtitle1Font()};
    margin-left: 4px;
    color: ${({ theme }) => theme.accent5};
  }

  &:focus-within {
    & > .title {
      color: ${({ theme }) => theme.success};
    }
  }
`;

const TagsWrapper = styled.div<{ isHaveTag: boolean; }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  padding-left:  ${({ isHaveTag }) => (isHaveTag ? '8px' : '16px')};
  padding-top: ${({ isHaveTag }) => (isHaveTag ? '5px' : '11px')};
  padding-bottom: ${({ isHaveTag }) => (isHaveTag ? '5px' : '11px')};
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.accent2};
  box-sizing: border-box;
  border-radius: 8px;
  margin: 6px 0;
  transition: border-color 0.1s ease-in-out;

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.success};
  }

  div {
    margin-right: 6px;
  }
`;

const TagInput = styled.input<{ isHaveTag: boolean; }>`
  ${body1Font()};
  display: inline-flex;
  outline: none;
  height: ${({ isHaveTag }) => (isHaveTag ? '32px' : '28px')};
  min-width: 8rem;
  color: ${({ theme }) => theme.foreground};
  border: none;
  cursor: text;

  &::placeholder {
    color: ${({ theme }) => theme.accent4};
  }
`;
