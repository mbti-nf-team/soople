import React, { ChangeEvent, ReactElement } from 'react';

import styled from '@emotion/styled';

import { WriteFields } from '@/models/group';
import { h2Font, h3Font } from '@/styles/fontStyles';
import mq, { mediaQueries } from '@/styles/responsive';

import TagForm from './TagForm';
import WriteEditor from './WriteEditor';

interface Props {
  fields: WriteFields;
  onChange: (form: Partial<WriteFields>) => void;
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
  position: relative;
  margin-bottom: 80px;
`;

const TitleInput = styled.input`
  ${mq({
    padding: ['8px 0px', 0],
    marginBottom: [false, '24px'],
  })};

  ${mediaQueries[0]} {
    ${h2Font(true)}
  }
  
  ${h3Font(true)}
  color: ${({ theme }) => theme.foreground};
  outline: none;
  border: none;

  &::placeholder {
    color: ${({ theme }) => theme.accent4};
  }
`;
