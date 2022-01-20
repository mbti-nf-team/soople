import React, { useState } from 'react';

import styled from '@emotion/styled';

import { Applicant } from '@/models/group';
import { body2Font } from '@/styles/fontStyles';

import Button from '../common/Button';
import SubHeader from '../common/SubHeader';

import CompleteApplyFormModal from './CompleteApplyFormModal';

interface Props{
  goBack: () => void;
  applicants: Applicant[];
  onSubmit: () => void;
}

function ApplicationStatusHeader({ goBack, onSubmit, applicants }: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const numberConfirmApplicant = applicants.filter(({ isConfirm }) => isConfirm).length;

  const onClose = () => setIsVisible(false);
  const handleSubmit = () => {
    onSubmit();
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
            {`${numberConfirmApplicant}명 선택`}
          </SelectApplicantStatus>
          <Button
            type="button"
            size="small"
            color="success"
            disabled={!numberConfirmApplicant}
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
        numberApplicant={numberConfirmApplicant}
      />
    </>
  );
}

export default ApplicationStatusHeader;

const SelectApplicantStatus = styled.span`
  ${body2Font()};
  margin-right: 16px;
`;
