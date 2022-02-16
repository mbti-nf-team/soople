import React, { memo, useState } from 'react';

import styled from '@emotion/styled';

import { Applicant, CompletedGroupForm } from '@/models/group';
import { body2Font } from '@/styles/fontStyles';

import Button from '../common/Button';
import SubHeader from '../common/SubHeader';

import CompleteApplyFormModal from './CompleteApplyFormModal';

interface Props{
  goBack: () => void;
  applicants: Applicant[];
  onSubmit: (completedGroupForm: CompletedGroupForm) => void;
  timeRemaining: string | null;
}

function ApplicationStatusHeader({
  goBack, onSubmit, applicants, timeRemaining,
}: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const numberConfirmApplicants = applicants.filter(({ isConfirm }) => isConfirm).length;

  const onClose = () => setIsVisible(false);
  const handleSubmit = (completedGroupForm: CompletedGroupForm) => {
    onSubmit(completedGroupForm);
    onClose();
  };

  return (
    <>
      <SubHeader
        goBack={goBack}
        previousText={`${applicants.length}명의 신청현황`}
      >
        <>
          <SelectApplicantStatus>
            {`${numberConfirmApplicants}명 선택`}
          </SelectApplicantStatus>
          <Button
            type="button"
            size="small"
            color="success"
            disabled={!numberConfirmApplicants}
            onClick={() => setIsVisible(true)}
          >
            모집 완료
          </Button>
        </>
      </SubHeader>
      <CompleteApplyFormModal
        onClose={onClose}
        onSubmit={handleSubmit}
        isVisible={isVisible}
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
