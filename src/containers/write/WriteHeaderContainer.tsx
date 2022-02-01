import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import SubHeader from '@/components/common/SubHeader';
import { publishModalVisibleState } from '@/recoil/modal/atom';
import { getGroup } from '@/utils/utils';

function WriteHeaderContainer(): ReactElement {
  const router = useRouter();
  const setPublishModalVisible = useSetRecoilState(publishModalVisibleState);
  const groupId = useSelector(getGroup('groupId'));
  const { title } = useSelector(getGroup('writeFields'));

  const onSubmit = () => setPublishModalVisible(true);

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
