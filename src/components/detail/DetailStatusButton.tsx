import React, { ReactElement } from 'react';

import * as R from 'ramda';

import useCurrentTime from '@/hooks/useCurrentTime';
import { Profile } from '@/models/auth';
import { Applicant, ApplicantForm, Group } from '@/models/group';
import { isRecruiting } from '@/utils/utils';

import Button from '../common/Button';

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
}: Props): ReactElement {
  const { writer, isCompleted, groupId } = group;

  const currentTime = useCurrentTime(group);
  const isWriter = R.equals(writer.uid, user?.uid);
  const findApplicant = applicants.find(({ applicant }) => applicant.uid === user?.uid);

  if (isWriter) {
    return (
      <WriterStatusButtons
        groupId={groupId}
        isCompleted={isCompleted}
      />
    );
  }

  if (isApplicantsLoading) {
    return <Button disabled>로딩중...</Button>;
  }

  return (
    <ApplicantStatusButton
      user={user}
      onApply={onApply}
      isCompleted={isCompleted}
      applicant={findApplicant}
      isRecruiting={isRecruiting(group, currentTime)}
      onCancelApply={onCancelApply}
      onVisibleSignInModal={onVisibleSignInModal}
    />
  );
}

export default DetailStatusButton;
