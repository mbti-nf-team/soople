import React, { ReactElement, useState } from 'react';

import styled from '@emotion/styled';

import useBoolean from '@/hooks/useBoolean';
import { SelectOption } from '@/models';
import { Profile } from '@/models/auth';
import { Position, positionOption } from '@/models/group';
import { stringToExcludeNull } from '@/utils/utils';

import Button from '../common/Button';
import CreatableSelectBox from '../common/CreatableSelectBox';
import Input from '../common/Input';

import AskMemberWithdrawalModal from './modal/AskMemberWithdrawalModal';

interface Props {
  user: Profile | null;
  onWithdrawal: () => void;
}

function SettingForm({ user, onWithdrawal }: Props): ReactElement {
  const [, setPosition] = useState<Position>();
  const [isVisibleWithdrawalModal, openWithDrawalModal, closeWithDrawalModal] = useBoolean(false);

  const defaultPosition = user?.position ? ({
    label: user.position, value: user.position,
  }) as SelectOption<Position> : undefined;

  return (
    <>
      <Input
        id="name"
        labelText="닉네임"
        placeholder="닉네임을 입력하세요"
        defaultValue={stringToExcludeNull(user?.name)}
      />
      <Input
        id="email"
        labelText="이메일"
        placeholder="이메일을 입력하세요"
        defaultValue={user?.email}
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
        labelText="포트폴리오"
        labelOptionText="선택"
        placeholder="URL을 입력하세요"
        defaultValue={stringToExcludeNull(user?.portfolioUrl)}
      />
      <Button color="success" size="large">
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
    </>
  );
}

export default SettingForm;

const MemberWithdrawalButton = styled(Button)`
  color: ${({ theme }) => theme.accent6};
  margin-top: 12px;
`;
