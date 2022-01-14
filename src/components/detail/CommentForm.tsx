import React, { ChangeEvent, ReactElement, useState } from 'react';

import styled from '@emotion/styled';

import { Profile } from '@/models/auth';

import Button from '../common/Button';
import Textarea from '../common/Textarea';

interface Props {
  onSubmit: (commentForm: { content: string, writer: Profile }) => void;
  user: Profile | null;
  onVisible: () => void;
}

function CommentForm({ onSubmit, onVisible, user }: Props): ReactElement {
  const [content, setContent] = useState<string>('');

  const textareaPlaceholderText = user ? '댓글을 입력하세요' : '댓글을 남기려면 로그인이 필요합니다.';
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const handleSubmit = (writer: Profile) => {
    onSubmit({
      content: content.replace(/\n/g, '<br/>'),
      writer,
    });
    setContent('');
  };

  return (
    <CommentFormWrapper>
      <Textarea
        placeholder={textareaPlaceholderText}
        value={content}
        onChange={handleChange}
        disabled={!user}
      />
      {user ? (
        <Button color="primary" onClick={() => handleSubmit(user)} disabled={!content}>
          댓글 남기기
        </Button>
      ) : (
        <Button color="success" onClick={onVisible}>
          시작하기
        </Button>
      )}
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
