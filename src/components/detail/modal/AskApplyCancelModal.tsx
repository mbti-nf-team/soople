import React, { ReactElement } from 'react';

import ConfirmModal from '@/components/common/ConfirmModal';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
}

function AskApplyCancelModal({ isVisible, onClose, onCancel }: Props): ReactElement {
  return (
    <ConfirmModal
      isVisible={isVisible}
      title="신청 취소하기"
      description="팀 신청을 취소하시겠습니까? 취소하시면 다시 되돌릴 수 없습니다."
      confirmText="취소하기"
      confirmButtonColor="warning"
      onClose={onClose}
      onConfirm={onCancel}
    />
  );
}

export default AskApplyCancelModal;
