import React, { ChangeEvent, ReactElement, useState } from 'react';

import styled from '@emotion/styled';

import palette from '@/styles/palette';

import Button from '../common/Button';

interface Props {
  onSubmit: (content: string) => void;
}

function CommentForm({ onSubmit }: Props): ReactElement {
  const [content, setContent] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const handleSubmit = () => {
    onSubmit(content.replace(/\n/g, '<br/>'));
    setContent('');
  };

  return (
    <CommentFormWrapper>
      <Textarea
        placeholder="댓글을 입력하세요"
        value={content}
        onChange={handleChange}
      />
      <Button color="primary" onClick={handleSubmit} disabled={!content}>
        댓글 남기기
      </Button>
    </CommentFormWrapper>
  );
}

export default CommentForm;

const CommentFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 120px;

  textarea {
    margin-bottom: 18px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background: ${palette.background};
  border: 1px solid ${palette.accent2};
  box-sizing: border-box;
  border-radius: 8px;
  resize: none;
  outline: none;

  &::placeholder {
    color: ${palette.accent4};
  }
`;
