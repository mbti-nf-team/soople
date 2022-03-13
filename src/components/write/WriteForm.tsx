import React, { ChangeEvent, ReactElement } from 'react';

import styled from '@emotion/styled';

import { KeyPair } from '@/models';
import { WriteFields } from '@/models/group';
import { h2Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

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
      <TitleInput
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="제목을 입력하세요"
        autoComplete="off"
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
  margin-bottom: 80px;
`;

const TitleInput = styled.input`
  ${h2Font(true)}
  color: ${palette.foreground};
  outline: none;
  border: none;
  padding: 0;
  margin-bottom: 24px;

  &::placeholder {
    color: ${palette.accent4};
  }
`;
