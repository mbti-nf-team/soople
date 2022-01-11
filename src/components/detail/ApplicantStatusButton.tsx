import React, { ReactElement, useState } from 'react';

import { Profile } from '@/models/auth';
import { Applicant, ApplicantForm } from '@/models/group';

import Button from '../common/Button';

import AskApplyCancelModal from './modal/AskApplyCancelModal';
import ApplyFormModal from './ApplyFormModal';

interface Props {
  user: Profile | null;
  isCompleted: boolean;
  onApply: (applyFields: ApplicantForm) => void;
  onVisibleSignInModal: () => void;
  applicant?: Applicant;
  onCancelApply: (applicantId: string) => void;
}

function ApplicantStatusButton({
  isCompleted, onApply, user, onVisibleSignInModal, applicant, onCancelApply,
}: Props): ReactElement {
  const [isVisibleApplyModal, setIsVisibleApplyModal] = useState<boolean>(false);
  const [isVisibleCancelModal, setIsVisibleCancelModal] = useState<boolean>(false);

  const handleSubmit = (applyFields: ApplicantForm) => {
    onApply(applyFields);
    setIsVisibleApplyModal(false);
  };

  const handleClick = () => {
    if (user) {
      setIsVisibleApplyModal(true);
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

  if (applicant) {
    return (
      <>
        <Button color="warning" onClick={() => setIsVisibleCancelModal(true)}>
          신청 취소
        </Button>
        <AskApplyCancelModal
          onClose={() => setIsVisibleCancelModal(false)}
          onCancel={() => onCancelApply(applicant.uid)}
          isVisible={isVisibleCancelModal}
        />
      </>
    );
  }

  return (
    <>
      <Button color="success" onClick={handleClick}>
        신청하기
      </Button>
      <ApplyFormModal
        onSubmit={handleSubmit}
        isVisible={isVisibleApplyModal}
        initPortfolioUrl={user?.portfolioUrl}
        onClose={() => setIsVisibleApplyModal(false)}
      />
    </>
  );
}

export default ApplicantStatusButton;
