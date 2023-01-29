import { memo } from 'react';

import styled from '@emotion/styled';

import useBoolean from '@/hooks/useBoolean';
import useResponsive from '@/hooks/useResponsive';
import { Applicant, CompletedGroupForm } from '@/models/group';
import { body2Font } from '@/styles/fontStyles';
import { mobileMediaQuery } from '@/styles/responsive';

import Button from '../common/Button';
import SubHeader from '../common/SubHeader';

import CompleteApplyFormModal from './CompleteApplyFormModal';

interface Props {
  goBack: () => void;
  applicants: Applicant[];
  onSubmit: (completedGroupForm: CompletedGroupForm) => void;
  timeRemaining: string | null;
}

function ApplicationStatusHeader({
  goBack, onSubmit, applicants, timeRemaining,
}: Props) {
  const { isMobile, isClient } = useResponsive();
  const [
    isVisibleCompleteApplyFormModal, openCompleteApplyFormModal, closeCompleteApplyFormModal,
  ] = useBoolean(false);

  const numberConfirmApplicants = applicants.filter(({ isConfirm }) => isConfirm).length;

  const handleSubmit = (completedGroupForm: CompletedGroupForm) => {
    onSubmit(completedGroupForm);
    closeCompleteApplyFormModal();
  };

  return (
    <>
      <SubHeader
        goBack={goBack}
        previousText={`${applicants.length}명의 신청현황`}
      >
        <>
          {!isMobile && isClient && (
            <SelectApplicantStatus>
              {`${numberConfirmApplicants}명 선택`}
            </SelectApplicantStatus>
          )}
          <SubmitButtonWrapper>
            {isClient && (
              <Button
                type="button"
                size={isMobile ? 'large' : 'small'}
                color="success"
                disabled={!numberConfirmApplicants}
                onClick={openCompleteApplyFormModal}
              >
                {isMobile ? `${numberConfirmApplicants}명 모집 완료` : '모집 완료'}
              </Button>
            )}
          </SubmitButtonWrapper>
        </>
      </SubHeader>
      <CompleteApplyFormModal
        onClose={closeCompleteApplyFormModal}
        onSubmit={handleSubmit}
        isVisible={isVisibleCompleteApplyFormModal}
        numberApplicant={numberConfirmApplicants}
        timeRemaining={timeRemaining}
      />
    </>
  );
}

export default memo(ApplicationStatusHeader);

const SelectApplicantStatus = styled.span`
  ${body2Font()};
  margin-right: 16px;
`;

const SubmitButtonWrapper = styled.div`
  ${mobileMediaQuery} {
    width: calc(100% - 40px);
    position: fixed;
    bottom: 20px;
    right: 20px;

    & > button {
      width: 100%;
    }
  }
`;
