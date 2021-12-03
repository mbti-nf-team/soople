import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

import type { Profile, SignUpAdditionalForm } from '@/models/auth';
import { stringToExcludeNull } from '@/utils/utils';

interface Props {
  onSubmit: (formData: SignUpAdditionalForm) => void;
  fields: Profile;
}

const validationSchema = yup.object({
  name: yup.string().required('닉네임을 입력해주세요.'),
  portfolioUrl: yup.string().notRequired().nullable(),
}).required();

function SignUpForm({ onSubmit, fields }: Props): ReactElement {
  const { name, email, image } = fields;
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpAdditionalForm>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div>
      <img src={stringToExcludeNull(image)} alt={`${email}-thumbnail`} width="300px" height="300px" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">
            닉네임
            <input type="text" id="name" defaultValue={stringToExcludeNull(name)} placeholder="닉네임을 입력해주세요" {...register('name')} />
          </label>
          <div>{errors.name?.message}</div>
        </div>

        <div>
          <label htmlFor="email">
            이메일
            <input type="email" id="email" defaultValue={stringToExcludeNull(email)} disabled />
          </label>
        </div>

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
