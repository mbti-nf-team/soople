import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { User } from 'firebase/auth';
import * as yup from 'yup';

import { SelectOption } from '@/models';
import type { SignUpAdditionalForm } from '@/models/auth';
import { Position } from '@/models/group';
import { stringToExcludeNull } from '@/utils/utils';

import Button from '../common/Button';
import CreatableSelectBox from '../common/CreatableSelectBox';
import Input from '../common/Input';

interface Props {
  onSubmit: (formData: SignUpAdditionalForm) => void;
  fields: User;
}

const positionOption: SelectOption<Position>[] = [
  { label: '프론트엔드', value: '프론트엔드' },
  { label: '백엔드', value: '백엔드' },
  { label: '학생', value: '학생' },
  { label: '디자인', value: '디자인' },
];

const validationSchema = yup.object({
  name: yup.string().trim().required('닉네임을 입력해주세요.'),
  portfolioUrl: yup.string().trim().notRequired().nullable(),
}).required();

function SignUpForm({ onSubmit, fields }: Props): ReactElement {
  const { displayName, email } = fields;
  const {
    register, handleSubmit, setValue, formState: {
      errors,
    },
  } = useForm<SignUpAdditionalForm>({
    resolver: yupResolver(validationSchema),
  });
  const [position, setPosition] = useState<Position>();

  const handleSubmitAction = (formData: SignUpAdditionalForm) => {
    if (!position) {
      return;
    }

    onSubmit({ ...formData, position });
  };

  return (
    <SignUpFormWrapper onSubmit={handleSubmit(handleSubmitAction)}>
      <Input
        id="name"
        labelText="닉네임"
        placeholder="닉네임을 입력해주세요"
        register={register('name')}
        onClear={() => setValue('name', '')}
        defaultValue={stringToExcludeNull(displayName)}
        isError={!!errors.name}
        message={errors.name?.message}
        type="text"
      />
      <Input
        id="email"
        labelText="이메일"
        placeholder="이메일을 입력해주세요"
        defaultValue={stringToExcludeNull(email)}
        type="email"
        disabled
      />
      <CreatableSelectBox
        id="position"
        options={positionOption}
        labelText="포지션"
        onChange={setPosition}
        placeholder="포지션을 입력 또는 선택해주세요."
        errorMessage="포지션을 입력 또는 선택해주세요."
      />
      <Input
        id="portfolioUrl"
        labelText="포트폴리오 URL"
        labelOptionText="선택"
        placeholder="URL을 입력하세요"
        register={register('portfolioUrl')}
        onClear={() => setValue('portfolioUrl', '')}
        type="url"
      />
      <Button type="submit" color="primary" size="large">확인</Button>
    </SignUpFormWrapper>
  );
}

export default SignUpForm;

const SignUpFormWrapper = styled.form`
  width: 100%;

  & > :not(:last-child) {
    margin-bottom: 20px;
  }
`;
