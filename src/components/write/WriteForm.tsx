import React, { ChangeEvent, ReactElement } from 'react';

import styled from '@emotion/styled';

import { WriteFields, WriteFieldsForm } from '@/models/group';

interface Props {
  fields: WriteFields;
  onChange: (form: WriteFieldsForm) => void;
}

function WriteForm({ fields, onChange }: Props): ReactElement {
  const { title, contents } = fields;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    onChange({ name, value });
  };

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
        name="contents"
        value={contents}
        rows={10}
        cols={20}
        onChange={handleChange}
        placeholder="내용을 입력하세요"
      />
    </WriteFormWrapper>
  );
}

export default WriteForm;

const WriteFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
