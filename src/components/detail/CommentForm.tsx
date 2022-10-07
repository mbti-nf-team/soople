import React, { ChangeEvent, ReactElement, useState } from 'react';

import styled from '@emotion/styled';

import useResponsive from '@/hooks/useResponsive';
import { Profile } from '@/models/auth';
import { CommentFields } from '@/models/group';

import Button from '../common/Button';
import Textarea from '../common/Textarea';

interface Props {
  onSubmit: (commentForm: CommentFields) => void;
  user: Profile | null;
}

function CommentForm({ onSubmit, user }: Props): ReactElement {
  const [content, setContent] = useState<string>('');
  const { isMobile, isClient } = useResponsive();

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
      {user && isClient && (
        <Button color="primary" size={isMobile ? 'small' : 'medium'} onClick={() => handleSubmit(user)} disabled={!content.trim()}>
          댓글 남기기
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
  margin-bottom: 30px;

  textarea {
    margin-bottom: 18px;
  }
`;
