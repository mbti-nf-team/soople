import React, {
  ReactElement, useEffect, useState,
} from 'react';

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
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onSubmit = () => setPublishModalVisible(true);

  useEffect(() => {
    if (router.query?.id) {
      setIsEdit(true);
    }
  }, [router.query]);

  return (
    <SubHeader
      goBack={() => router.back()}
      previousText={isEdit ? '글 수정하기' : '팀 모집하기'}
    >
      <Button
        type="button"
        size="small"
        color="success"
        disabled={!title.trim()}
        onClick={onSubmit}
      >
        {isEdit ? '저장하기' : '등록하기'}
      </Button>
    </SubHeader>
  );
}

export default WriteHeaderContainer;
