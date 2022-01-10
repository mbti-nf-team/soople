import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import DetailHeaderSection from '@/components/detail/DetailHeaderSection';
import useCurrentTime from '@/hooks/useCurrentTime';
import { ApplicantForm, Group } from '@/models/group';
import { setSignInModalVisible } from '@/reducers/authSlice';
import { loadApplicants, requestAddApplicant } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth, getGroup } from '@/utils/utils';

function DetailHeaderContainer(): ReactElement | null {
  const dispatch = useAppDispatch();
  const group = useSelector(getGroup('group')) as Group;
  const user = useSelector(getAuth('user'));
  const applicants = useSelector(getGroup('applicants'));
  const currentTime = useCurrentTime(group.isCompleted);

  const onVisibleSignInModal = useCallback(() => dispatch(setSignInModalVisible(true)), [dispatch]);

  const onApply = useCallback((applyFields: ApplicantForm) => dispatch(requestAddApplicant({
    groupId: group.groupId,
    ...applyFields,
  })), [dispatch, group.groupId]);

  useEffect(() => dispatch(loadApplicants(group.groupId)), []);

  return (
    <DetailHeaderSection
      user={user}
      group={group}
      applicants={applicants}
      currentTime={currentTime}
      onApply={onApply}
      onVisibleSignInModal={onVisibleSignInModal}
    />
  );
}

export default DetailHeaderContainer;
