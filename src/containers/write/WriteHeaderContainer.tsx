import React, {
  ReactElement, useEffect, useState,
} from 'react';

import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import SubHeader from '@/components/common/SubHeader';
import useLessThenScrollY from '@/hooks/useLessThenScrollY';
import useResponsive from '@/hooks/useResponsive';
import { writeFieldsState } from '@/recoil/group/atom';
import { publishModalVisibleState } from '@/recoil/modal/atom';

function WriteHeaderContainer(): ReactElement {
  const router = useRouter();
  const { isMobile, isClient } = useResponsive();
  const isLessThenScrollY = useLessThenScrollY(30);

  const { title } = useRecoilValue(writeFieldsState);
  const setPublishModalVisible = useSetRecoilState(publishModalVisibleState);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onOpenPublishModal = () => setPublishModalVisible(true);

  const previousText = () => {
    if (!isClient) {
      return '';
    }

    if (isMobile) {
      return isLessThenScrollY ? '' : title;
    }

    if (isEdit) {
      return '글 수정하기';
    }

    return '팀 모집하기';
  };

  useEffect(() => {
    if (router.query?.id) {
      setIsEdit(true);
    }
  }, [router.query]);

  return (
    <SubHeader
      goBack={() => router.back()}
      previousText={previousText()}
    >
      <Button
        type="button"
        size="small"
        color="success"
        disabled={!title.trim()}
        onClick={onOpenPublishModal}
      >
        {isEdit ? '저장하기' : '등록하기'}
      </Button>
    </SubHeader>
  );
}

export default WriteHeaderContainer;
