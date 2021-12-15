import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import WriteHeader from '@/components/write/WriteHeader';
import { setPublishModalVisible } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getGroup } from '@/utils/utils';

function WriteHeaderContainer(): ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const groupId = useSelector(getGroup('groupId'));
  const { title } = useSelector(getGroup('writeFields'));

  const onSubmit = useCallback(() => dispatch(setPublishModalVisible(true)), [dispatch]);

  useEffect(() => {
    if (groupId) {
      router.replace(`/detail/${groupId}`);
    }
  }, [groupId]);

  return (
    <WriteHeader
      title={title}
      onSubmit={onSubmit}
    />
  );
}

export default WriteHeaderContainer;
