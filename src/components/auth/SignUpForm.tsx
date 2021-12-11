import React, { ChangeEvent, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

import type { Profile, SignUpAdditionalForm } from '@/models/auth';
import { stringToExcludeNull } from '@/utils/utils';

import Select from '../common/Select';

interface Props {
  onSubmit: (formData: SignUpAdditionalForm) => void;
  fields: Profile;
}

const selectPositionOptions = {
  frontEnd: '프론트엔드',
  backEnd: '백엔드',
  student: '학생',
  design: '디자인',
  directInput: '직접 입력',
};

const validationSchema = yup.object({
  name: yup.string().required('닉네임을 입력해주세요.'),
  position: yup.string().required('포지션을 선택해주세요.'),
  portfolioUrl: yup.string().notRequired().nullable(),
}).required();

function SignUpForm({ onSubmit, fields }: Props): ReactElement {
  const [isDirectValue, setIsDirectValue] = useState<boolean>(false);
  const { name, email, image } = fields;
  const {
    register, handleSubmit, formState: { errors }, setValue, resetField, clearErrors,
  } = useForm<SignUpAdditionalForm>({
    resolver: yupResolver(validationSchema),
  });

  const positionRegister = register('position');

  const onChangeSelectBox = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'directInput') {
      setIsDirectValue(true);
      resetField('position');
      return;
    }

    positionRegister.onChange(e);
  };

  const onChangeDirectInput = (e: ChangeEvent<HTMLInputElement>) => setValue('position', e.target.value);

  const onClickCloseDirectInput = () => {
    setIsDirectValue(false);
    resetField('position');
    clearErrors('position');
  };

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
          <label htmlFor="position">
            포지션
            {isDirectValue && (
              <>
                <input type="text" placeholder="포지션을 입력해주세요." onChange={onChangeDirectInput} />
                <button type="button" onClick={onClickCloseDirectInput}>x</button>
              </>
            )}
            <Select
              id="position"
              isDirect={isDirectValue}
              register={positionRegister}
              onChange={onChangeSelectBox}
              defaultOption="포지션을 션택하세요"
              options={selectPositionOptions}
            />
          </label>
          <div>{errors.position?.message}</div>
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
