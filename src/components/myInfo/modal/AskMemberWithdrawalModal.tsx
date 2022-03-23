import React, { ReactElement } from 'react';

import ConfirmModal from '@/components/common/ConfirmModal';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onWithdrawal: () => void;
}

function AskMemberWithdrawalModal({ isVisible, onClose, onWithdrawal }: Props): ReactElement {
  return (
    <ConfirmModal
      isVisible={isVisible}
      title="회원 탈퇴하기"
      description={`탈퇴하시면 내 정보에 등록된 계정 정보가 모두 삭제돼요.
      정말 코너스를 탈퇴하시겠어요? 😭`}
      confirmText="탈퇴하기"
      confirmButtonColor="warning"
      onClose={onClose}
      onConfirm={onWithdrawal}
    />
  );
}

export default AskMemberWithdrawalModal;
