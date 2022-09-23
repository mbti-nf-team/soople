import React, { ReactElement } from 'react';

import useBoolean from '@/hooks/useBoolean';
import useResponsive from '@/hooks/useResponsive';
import { Profile } from '@/models/auth';
import { Applicant, ApplicantForm } from '@/models/group';

import Button from '../common/Button';

import AskApplyCancelModal from './modal/AskApplyCancelModal';
import MembersViewModal from './modal/MembersViewModal';
import ApplyFormModal from './ApplyFormModal';

interface Props {
  user: Profile | null;
  isCompleted: boolean;
  onApply: (applyFields: ApplicantForm) => void;
  onVisibleSignInModal: () => void;
  applicant?: Applicant;
  onCancelApply: (applicantId: string) => void;
  isRecruiting: boolean;
}

function ApplicantStatusButton({
  isCompleted, onApply, user, onVisibleSignInModal, applicant, onCancelApply, isRecruiting,
}: Props): ReactElement | null {
  const { isMobile } = useResponsive();

  const [isVisibleApplicantsModal, openApplicantModal, closeApplicantModal] = useBoolean(false);
  const [isVisibleAskCancelModal, openAskCancelModal, closeAskCancelModal] = useBoolean(false);
  const [isVisibleApplyModal, openApplyModal, closeApplyModal] = useBoolean(false);

  const buttonSize = isMobile ? 'small' : 'medium';

  const handleSubmit = (applyFields: ApplicantForm) => {
    onApply(applyFields);
    closeApplyModal();
  };

  const handleClick = () => {
    if (user) {
      openApplyModal();
      return;
    }

    onVisibleSignInModal();
  };

  if (isCompleted && applicant?.isConfirm) {
    return (
      <>
        <Button color="primary" onClick={openApplicantModal} size={buttonSize}>
          팀원 보기
        </Button>
        <MembersViewModal
          isVisible={isVisibleApplicantsModal}
          onClose={closeApplicantModal}
        />
      </>
    );
  }

  if (!isRecruiting) {
    return null;
  }

  if (applicant) {
    return (
      <>
        <Button color="primary" onClick={openAskCancelModal} size={buttonSize}>
          신청 취소
        </Button>
        <AskApplyCancelModal
          onClose={closeAskCancelModal}
          onCancel={() => {
            onCancelApply(applicant.uid);
            closeAskCancelModal();
          }}
          isVisible={isVisibleAskCancelModal}
        />
      </>
    );
  }

  return (
    <>
      <Button color="success" onClick={handleClick} size={buttonSize}>
        신청하기
      </Button>
      <ApplyFormModal
        onSubmit={handleSubmit}
        isVisible={isVisibleApplyModal}
        initPortfolioUrl={user?.portfolioUrl}
        onClose={closeApplyModal}
      />
    </>
  );
}

export default ApplicantStatusButton;
