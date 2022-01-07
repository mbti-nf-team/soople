import React, { ReactElement } from 'react';

import ConfirmModal from '@/components/common/ConfirmModal';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function AskDeleteCommentModal({ isVisible, onClose, onConfirm }: Props): ReactElement {
  return (
    <ConfirmModal
      isVisible={isVisible}
      title="삭제하기"
      description="이 댓글을 정말 삭제하시겠습니까? 삭제하시면 다시 되돌릴 수 없습니다."
      confirmText="삭제하기"
      confirmButtonColor="warning"
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

export default AskDeleteCommentModal;
