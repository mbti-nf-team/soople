import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import Button from '@/components/common/Button';
import SubHeader from '@/components/common/SubHeader';
import { body2Font } from '@/styles/fontStyles';
import { getGroup } from '@/utils/utils';

function ApplicationStatusHeaderContainer(): ReactElement {
  const router = useRouter();
  const applicants = useSelector(getGroup('applicants'));
  const numberConfirmApplicant = applicants.filter(({ isConfirm }) => isConfirm).length;

  return (
    <SubHeader
      goBack={() => router.back()}
      previousText={`${applicants.length}명의 신청현황`}
    >
      <>
        <SelectApplicantStatus>
          {`${numberConfirmApplicant}명 선택`}
        </SelectApplicantStatus>
        <Button type="button" size="small" color="success" disabled={!numberConfirmApplicant}>
          모집 완료
        </Button>
      </>
    </SubHeader>
  );
}

export default ApplicationStatusHeaderContainer;

const SelectApplicantStatus = styled.span`
  ${body2Font()};
  margin-right: 16px;
`;
