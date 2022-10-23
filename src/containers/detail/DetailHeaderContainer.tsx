import React, { ReactElement, useCallback, useEffect } from 'react';

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
import { successToast } from '@/utils/toast';

function DetailHeaderContainer(): ReactElement {
  const { data: user } = useFetchUserProfile();
  const setSignInModalVisible = useSetRecoilState(signInModalVisibleState);
  const { data: group } = useFetchGroup();
  const { data: applicants, isLoading } = useFetchApplicants({ suspense: false });
  const { mutate: applyMutate, isSuccess: isSuccessApply } = useApplyGroup();
  const { mutate: applyCancelMutate, isSuccess: isSuccessCancelApply } = useCancelApply();

  const onVisibleSignInModal = () => setSignInModalVisible(true);
  const onCancelApply = useCallback((
    applicantId: string,
  ) => applyCancelMutate(applicantId), [applyCancelMutate]);

  const onApply = useCallback((applyFields: ApplicantForm) => applyMutate({
    ...applyFields,
    group,
    applicant: user as Profile,
  }), [group, user, applyMutate]);

  useEffect(() => {
    if (isSuccessApply) {
      successToast('팀 신청을 완료했어요.');
    }
  }, [isSuccessApply]);

  useEffect(() => {
    if (isSuccessCancelApply) {
      successToast('신청을 취소했어요.');
    }
  }, [isSuccessCancelApply]);

  return (
    <DetailHeaderSection group={group}>
      <DetailStatusButton
        user={user}
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
