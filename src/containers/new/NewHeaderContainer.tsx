import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import NewHeader from '@/components/new/NewHeader';
import { setPublishModalVisible } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getGroup } from '@/utils/utils';

function NewHeaderContainer(): ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const groupId = useSelector(getGroup('groupId'));

  const onSubmit = useCallback(() => dispatch(setPublishModalVisible(true)), [dispatch]);

  useEffect(() => {
    if (groupId) {
      router.replace(`/detail/${groupId}`);
    }
  }, [groupId]);

  return (
    <NewHeader
      onSubmit={onSubmit}
    />
  );
}

export default NewHeaderContainer;
