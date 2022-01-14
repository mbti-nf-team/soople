import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import DetailHeaderSection from '@/components/detail/DetailHeaderSection';
import DetailStatusButton from '@/components/detail/DetailStatusButton';
import { ApplicantForm, Group } from '@/models/group';
import { setSignInModalVisible } from '@/reducers/authSlice';
import { loadApplicants, requestAddApplicant, requestDeleteApplicant } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth, getGroup } from '@/utils/utils';

function DetailHeaderContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const group = useSelector(getGroup('group')) as Group;
  const user = useSelector(getAuth('user'));
  const applicants = useSelector(getGroup('applicants'));

  const onVisibleSignInModal = useCallback(() => dispatch(setSignInModalVisible(true)), [dispatch]);
  const onCancelApply = useCallback((applicantId: string) => {
    dispatch(requestDeleteApplicant(applicantId));
  }, [dispatch]);

  const onApply = useCallback((applyFields: ApplicantForm) => dispatch(requestAddApplicant({
    groupId: group.groupId,
    ...applyFields,
  })), [dispatch, group.groupId]);

  useEffect(() => dispatch(loadApplicants(group.groupId)), []);

  return (
    <DetailHeaderSection group={group}>
      <DetailStatusButton
        user={user}
        group={group}
        onApply={onApply}
        applicants={applicants}
        onVisibleSignInModal={onVisibleSignInModal}
        onCancelApply={onCancelApply}
      />
    </DetailHeaderSection>
  );
}

export default DetailHeaderContainer;
