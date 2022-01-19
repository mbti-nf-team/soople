import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import Button from '@/components/common/Button';
import SubHeader from '@/components/common/SubHeader';
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
    <SubHeader
      goBack={() => router.back()}
      previousText="팀 모집하기"
    >
      <Button
        type="button"
        size="small"
        color="success"
        disabled={!title}
        onClick={onSubmit}
      >
        등록하기
      </Button>
    </SubHeader>
  );
}

export default WriteHeaderContainer;
