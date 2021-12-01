import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

import type { Profile, RegisterAdditionalForm } from '@/models/auth';
import { stringToExcludeNull } from '@/utils/utils';

interface Props {
  onSubmit: (formData: RegisterAdditionalForm) => void;
  fields: Profile;
}

const validationSchema = yup.object({
  name: yup.string().required('이름을 입력해주세요.'),
  userId: yup.string().required('아이디를 입력해주세요.'),
  portfolioUrl: yup.string().notRequired().nullable(),
}).required();

function RegisterForm({ onSubmit, fields }: Props): ReactElement {
  const {
    name, email, userId, thumbnail,
  } = fields;
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterAdditionalForm>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div>
      <img src={stringToExcludeNull(thumbnail)} alt={`${email}-thumbnail`} width="300px" height="300px" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">
            이름
            <input type="text" id="name" defaultValue={stringToExcludeNull(name)} placeholder="이름" {...register('name')} />
          </label>
          <div>{errors.name?.message}</div>
        </div>

        <div>
          <label htmlFor="email">
            이메일
            <input type="text" id="email" defaultValue={stringToExcludeNull(email)} disabled />
          </label>
        </div>

        <div>
          <label htmlFor="userId">
            아이디
            <input type="text" id="userId" placeholder="아이디를 입력하세요" defaultValue={stringToExcludeNull(userId)} {...register('userId')} />
          </label>
          <div>{errors.userId?.message}</div>
        </div>

        <div>
          <label htmlFor="portfolioUrl">
            포트폴리오 URL (선택)
            <input type="text" id="portfolioUrl" placeholder="포트포리오 URL을 입력해주세요" {...register('portfolioUrl')} />
          </label>
        </div>

        <div>
          <button type="submit">저장</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
