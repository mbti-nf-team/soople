import React, { ReactElement } from 'react';

import * as R from 'ramda';

import { Profile } from '@/models/auth';
import { Applicant, ApplicantForm, Group } from '@/models/group';

import ApplicantStatusButton from './ApplicantStatusButton';
import WriterStatusButtons from './WriterStatusButtons';

interface Props {
  user: Profile | null;
  group: Group;
  applicants: Applicant[];
  onApply: (applyFields: ApplicantForm) => void;
  onVisibleSignInModal: () => void;
  onCancelApply: (applicantId: string) => void;
}

function DetailStatusButton({
  group, user, onApply, onVisibleSignInModal, applicants, onCancelApply,
}: Props): ReactElement {
  const { writer, isCompleted } = group;

  const isWriter = R.equals(writer.uid, user?.uid);
  const findApplicant = applicants.find(({ applicant }) => applicant.uid === user?.uid);

  if (isWriter) {
    return (
      <WriterStatusButtons isCompleted={isCompleted} />
    );
  }

  return (
    <ApplicantStatusButton
      user={user}
      onApply={onApply}
      isCompleted={isCompleted}
      applicant={findApplicant}
      onCancelApply={onCancelApply}
      onVisibleSignInModal={onVisibleSignInModal}
    />
  );
}

export default DetailStatusButton;
