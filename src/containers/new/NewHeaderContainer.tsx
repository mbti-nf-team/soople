import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import NewHeader from '@/components/new/NewHeader';
import { requestRegisterNewGroup } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getGroup } from '@/utils/utils';

function NewHeaderContainer(): ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const groupId = useSelector(getGroup('groupId'));

  const onRegisterGroup = useCallback(() => dispatch(requestRegisterNewGroup()), [dispatch]);

  useEffect(() => {
    if (groupId) {
      router.replace('/');
    }
  }, [groupId]);

  return (
    <NewHeader
      onSubmit={onRegisterGroup}
    />
  );
}

export default NewHeaderContainer;
