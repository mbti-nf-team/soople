import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { User } from 'firebase/auth';
import * as yup from 'yup';

import { SelectOption } from '@/models';
import type { SignUpAdditionalForm } from '@/models/auth';
import { Position } from '@/models/group';
import { stringToExcludeNull } from '@/utils/utils';

import CreatableSelectBox from '../common/CreatableSelectBox';

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
  const { displayName, email, photoURL } = fields;
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpAdditionalForm>({
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
    <div>
      <img src={stringToExcludeNull(photoURL)} alt={`${email}-thumbnail`} width="300px" height="300px" />
      <form onSubmit={handleSubmit(handleSubmitAction)}>
        <div>
          <label htmlFor="name">
            닉네임
            <input type="text" id="name" defaultValue={stringToExcludeNull(displayName)} placeholder="닉네임을 입력해주세요" {...register('name')} />
          </label>
          <div>{errors.name?.message}</div>
        </div>

        <div>
          <label htmlFor="email">
            이메일
            <input type="email" id="email" defaultValue={stringToExcludeNull(email)} disabled />
          </label>
        </div>

        <CreatableSelectBox
          id="position"
          options={positionOption}
          labelText="포지션"
          onChange={setPosition}
          placeholder="포지션을 선택하세요"
          errorMessage="포지션을 선택하세요"
        />
        <div>
          <label htmlFor="portfolioUrl">
            포트폴리오 URL (선택)
            <input type="url" id="portfolioUrl" placeholder="URL을 입력해주세요" {...register('portfolioUrl')} />
          </label>
        </div>

        <div>
          <button type="submit">확인</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
