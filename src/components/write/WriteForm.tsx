import React, { ChangeEvent, ReactElement } from 'react';

import styled from '@emotion/styled';

import { KeyPair } from '@/models';
import { WriteFields } from '@/models/group';

import TagForm from './TagForm';
import WriteEditor from './WriteEditor';

interface Props {
  fields: WriteFields;
  onChange: (form: KeyPair<WriteFields>) => void;
}

function WriteForm({ fields, onChange }: Props): ReactElement {
  const { title, tags: initialTags } = fields;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    onChange({ [name]: value });
  };

  const handleChangeTags = (tags: string[]) => onChange({ tags });

  return (
    <WriteFormWrapper>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="제목을 입력하세요"
      />
      <WriteEditor />
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
