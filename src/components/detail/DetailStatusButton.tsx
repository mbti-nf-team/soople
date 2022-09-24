import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import useCurrentTime from '@/hooks/useCurrentTime';
import { Profile } from '@/models/auth';
import { Applicant, ApplicantForm, Group } from '@/models/group';
import { mobileMediaQuery } from '@/styles/responsive';
import zIndexes from '@/styles/zIndexes';
import { isRecruiting } from '@/utils/utils';

import ApplicantStatusButton from './ApplicantStatusButton';
import WriterStatusButtons from './WriterStatusButtons';

interface Props {
  user: Profile | null;
  group: Group;
  applicants: Applicant[];
  onApply: (applyFields: ApplicantForm) => void;
  onVisibleSignInModal: () => void;
  onCancelApply: (applicantId: string) => void;
  isApplicantsLoading: boolean;
}

function DetailStatusButton({
  group, user, onApply, onVisibleSignInModal, applicants, onCancelApply, isApplicantsLoading,
}: Props): ReactElement | null {
  const { writer, isCompleted } = group;

  const currentTime = useCurrentTime(group);
  const isWriter = writer.uid === user?.uid;
  const findApplicant = applicants.find(({ applicant }) => applicant.uid === user?.uid);

  if (isWriter) {
    return (
      <WriterStatusButtons
        group={group}
        isCompleted={isCompleted}
      />
    );
  }

  if (isApplicantsLoading) {
    return null;
  }

  return (
    <ApplicantStatusButtonWrapper>
      <ApplicantStatusButton
        user={user}
        onApply={onApply}
        isCompleted={isCompleted}
        applicant={findApplicant}
        isRecruiting={isRecruiting(group, currentTime)}
        onCancelApply={onCancelApply}
        onVisibleSignInModal={onVisibleSignInModal}
      />
    </ApplicantStatusButtonWrapper>
  );
}

export default DetailStatusButton;

const ApplicantStatusButtonWrapper = styled.div`
  ${mobileMediaQuery} {
    position: fixed;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    bottom: 0;
    width: 100%;
    right: 0;
    box-sizing: border-box;
    background: ${({ theme }) => theme.background};
    border-top: 1px solid ${({ theme }) => theme.accent2};
    padding: 12px 16px;
    z-index: ${zIndexes.BottomFixed};
  }
`;
