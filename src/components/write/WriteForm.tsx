import React, { ChangeEvent, ReactElement } from 'react';

import styled from '@emotion/styled';

import { WriteFields, WriteFieldsForm } from '@/models/group';

import TagForm from './TagForm';

interface Props {
  fields: WriteFields;
  onChange: (form: WriteFieldsForm) => void;
}

function WriteForm({ fields, onChange }: Props): ReactElement {
  const { title, content, tags: initialTags } = fields;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    onChange({ name, value });
  };

  const handleChangeTags = (tags: string[]) => onChange({
    name: 'tags',
    value: tags,
  });

  return (
    <WriteFormWrapper>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="제목을 입력하세요"
      />
      <textarea
        name="content"
        value={content}
        rows={10}
        cols={20}
        onChange={handleChange}
        placeholder="내용을 입력하세요"
      />
      <TagForm
        tags={initialTags}
        onChange={handleChangeTags}
      />
    </WriteFormWrapper>
  );
}

export default WriteForm;

const WriteFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
