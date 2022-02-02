import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import SubHeader from '@/components/common/SubHeader';
import { writeFieldsState } from '@/recoil/group/atom';
import { publishModalVisibleState } from '@/recoil/modal/atom';

function WriteHeaderContainer(): ReactElement {
  const router = useRouter();
  const setPublishModalVisible = useSetRecoilState(publishModalVisibleState);
  const { title } = useRecoilValue(writeFieldsState);

  const onSubmit = () => setPublishModalVisible(true);

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
