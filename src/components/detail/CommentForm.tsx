import React, { ChangeEvent, ReactElement, useState } from 'react';

interface Props {
  onSubmit: (content: string) => void;
}

function CommentForm({ onSubmit }: Props): ReactElement {
  const [content, setContent] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const handleSubmit = () => {
    onSubmit(content);
    setContent('');
  };

  return (
    <div>
      <textarea
        placeholder="댓글을 입력하세요"
        value={content}
        onChange={handleChange}
      />
      <button type="button" onClick={handleSubmit} disabled={!content}>
        댓글 남기기
      </button>
    </div>
  );
}

export default CommentForm;
