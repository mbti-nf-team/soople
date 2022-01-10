import React, { ReactElement, useState } from 'react';

import { Profile } from '@/models/auth';
import { ApplicantForm } from '@/models/group';

import Button from '../common/Button';

import ApplyFormModal from './ApplyFormModal';

interface Props {
  user: Profile | null;
  isCompleted: boolean;
  onApply: (applyFields: ApplicantForm) => void;
  onVisibleSignInModal: () => void;
  isApplicant: boolean;
}

function ApplicantStatusButton({
  isCompleted, onApply, user, onVisibleSignInModal, isApplicant,
}: Props): ReactElement {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleSubmit = (applyFields: ApplicantForm) => {
    onApply(applyFields);
    setIsVisible(false);
  };

  const handleClick = () => {
    if (user) {
      setIsVisible(true);
      return;
    }

    onVisibleSignInModal();
  };

  if (isCompleted) {
    return (
      <Button color="primary">
        팀원 보기
      </Button>
    );
  }

  if (isApplicant) {
    return (
      <Button color="warning">
        신청 취소
      </Button>
    );
  }

  return (
    <>
      <Button color="success" onClick={handleClick}>
        신청하기
      </Button>
      <ApplyFormModal
        onSubmit={handleSubmit}
        isVisible={isVisible}
        initPortfolioUrl={user?.portfolioUrl}
        onClose={() => setIsVisible(false)}
      />
    </>
  );
}

export default ApplicantStatusButton;
