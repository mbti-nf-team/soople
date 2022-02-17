import React, { ReactElement, useMemo } from 'react';

import DetailContentsSection from '@/components/detail/DetailContentsSection';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';

function DetailContentsContainer(): ReactElement {
  const { data: group } = useFetchGroup();
  const { data: applicants } = useFetchApplicants();
  const { data: user } = useFetchUserProfile();

  const isGroupMember = useMemo(() => {
    if (!group.isCompleted) {
      return false;
    }

    const isConfirmApplicant = applicants.some(({
      isConfirm, applicant,
    }) => applicant.uid === user?.uid && isConfirm);

    const writer = group.writer.uid === user?.uid;

    return isConfirmApplicant || writer;
  }, [applicants, user, group]);

  return (
    <DetailContentsSection
      group={group}
      isGroupMember={isGroupMember}
    />
  );
}

export default DetailContentsContainer;
