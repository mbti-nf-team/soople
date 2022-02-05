import React, { ReactElement, useCallback } from 'react';

import { useSetRecoilState } from 'recoil';

import DetailHeaderSection from '@/components/detail/DetailHeaderSection';
import DetailStatusButton from '@/components/detail/DetailStatusButton';
import useApplyGroup from '@/hooks/api/applicant/useApplyGroup';
import useCancelApply from '@/hooks/api/applicant/useCancelApply';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';
import { Profile } from '@/models/auth';
import { ApplicantForm } from '@/models/group';
import { signInModalVisibleState } from '@/recoil/modal/atom';

function DetailHeaderContainer(): ReactElement {
  const { data: profile } = useFetchUserProfile();
  const setSignInModalVisible = useSetRecoilState(signInModalVisibleState);
  const { data: group } = useFetchGroup();
  const { data: applicants, isLoading } = useFetchApplicants();
  const { mutate: applyMutate } = useApplyGroup();
  const { mutate: applyCancelMutate } = useCancelApply();

  const onVisibleSignInModal = () => setSignInModalVisible(true);
  const onCancelApply = useCallback((
    applicantId: string,
  ) => applyCancelMutate(applicantId), [applyCancelMutate]);

  const onApply = useCallback((applyFields: ApplicantForm) => applyMutate({
    ...applyFields,
    groupId: group.groupId,
    applicant: profile as Profile,
  }), [group.groupId, profile, applyMutate]);

  return (
    <DetailHeaderSection group={group}>
      <DetailStatusButton
        user={profile}
        group={group}
        onApply={onApply}
        applicants={applicants}
        isApplicantsLoading={isLoading}
        onVisibleSignInModal={onVisibleSignInModal}
        onCancelApply={onCancelApply}
      />
    </DetailHeaderSection>
  );
}

export default DetailHeaderContainer;
