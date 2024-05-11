import { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { removeNullable } from '@nf-team/core';
import { useBoolean } from '@nf-team/react';
import * as yup from 'yup';

import { SelectOption } from '@/models';
import { Profile, SignUpAdditionalForm } from '@/models/auth';
import { Position, positionOption } from '@/models/group';

import Button from '../common/Button';
import CreatableSelectBox from '../common/CreatableSelectBox';
import Input from '../common/Input';

import AskMemberWithdrawalModal from './modal/AskMemberWithdrawalModal';

interface Props {
  user: Profile | null;
  onWithdrawal: () => void;
  onSubmit: (formData: SignUpAdditionalForm) => void;
  isLoading: boolean;
}

const validationSchema = yup.object({
  name: yup.string().trim().required('닉네임을 입력해주세요.'),
  portfolioUrl: yup.string().trim().notRequired().nullable(),
}).required();

function SettingForm({
  user, onWithdrawal, onSubmit, isLoading,
}: Props): ReactElement {
  const {
    register, handleSubmit, formState: { isValid, errors, isDirty }, resetField, setValue,
  } = useForm<SignUpAdditionalForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const defaultPosition = user?.position ? ({
    label: user.position, value: user.position,
  }) as SelectOption<Position> : undefined;

  const [position, setPosition] = useState<Position | undefined>(defaultPosition?.value);
  const [isVisibleWithdrawalModal, openWithDrawalModal, closeWithDrawalModal] = useBoolean(false);

  useEffect(() => {
    if (user) {
      const { name, portfolioUrl } = user;

      setValue('name', removeNullable(name), { shouldValidate: true });
      setValue('portfolioUrl', removeNullable(portfolioUrl), { shouldValidate: true });
    }
  }, [user]);

  useEffectOnce(() => {
    setValue('position', removeNullable(position), { shouldValidate: true });
  });

  useUpdateEffect(() => {
    if (position) {
      setValue('position', removeNullable(position), { shouldValidate: true, shouldDirty: true });
    }
  }, [position]);

  return (
    <SettingFormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          labelText="닉네임"
          placeholder="닉네임을 입력하세요"
          register={register('name')}
          onClear={() => resetField('name')}
          isError={!!errors.name}
          message={errors.name?.message}
          type="text"
        />
        <Input
          id="email"
          type="email"
          labelText="이메일"
          placeholder="이메일을 입력하세요"
          defaultValue={removeNullable(user?.email)}
          disabled
        />
        <CreatableSelectBox
          id="position"
          defaultValue={defaultPosition}
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
          onClear={() => resetField('portfolioUrl')}
          type="url"
        />
        <Button
          type="submit"
          color="success"
          size="large"
          disabled={!isValid || !position || !isDirty}
          isLoading={isLoading}
        >
          저장하기
        </Button>
        <MemberWithdrawalButton
          color="ghost"
          size="medium"
          onClick={openWithDrawalModal}
        >
          회원 탈퇴하기
        </MemberWithdrawalButton>
        <AskMemberWithdrawalModal
          isVisible={isVisibleWithdrawalModal}
          onWithdrawal={onWithdrawal}
          onClose={closeWithDrawalModal}
        />
      </form>
    </SettingFormWrapper>
  );
}

export default SettingForm;

const MemberWithdrawalButton = styled(Button)`
  color: ${({ theme }) => theme.accent6};
  margin-top: 12px;
`;

const SettingFormWrapper = styled.div`
  & > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & > form > div {
    width: 100%;
    margin-bottom: 20px;
  }
`;
