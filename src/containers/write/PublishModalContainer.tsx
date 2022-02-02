import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useUnmount } from 'react-use';

import { useRecoilState, useResetRecoilState } from 'recoil';

import PublishModal from '@/components/write/PublishModal';
import PublishModalForm from '@/components/write/PublishModalForm';
import usePublishNewGroup from '@/hooks/api/group/usePublishNewGroup';
import { KeyPair } from '@/models';
import { Profile } from '@/models/auth';
import { WriteFields } from '@/models/group';
import { writeFieldsState } from '@/recoil/group/atom';
import { publishModalVisibleState } from '@/recoil/modal/atom';
import { getAuth } from '@/utils/utils';

function PublishModalContainer(): ReactElement {
  const [isVisible, setPublishModalVisible] = useRecoilState(publishModalVisibleState);
  const [writeFields, changeFields] = useRecoilState(writeFieldsState);
  const resetFields = useResetRecoilState(writeFieldsState);
  const { mutate } = usePublishNewGroup();
  const user = useSelector(getAuth('user')) as Profile;

  const onClose = () => setPublishModalVisible(false);
  const onSubmit = useCallback(() => mutate({
    profile: user, writeFields,
  }), [mutate, user, writeFields]);

  const onChangeFields = useCallback((form: KeyPair<WriteFields>) => {
    changeFields((prevState) => ({ ...prevState, ...form }));
  }, [changeFields]);

  useUnmount(resetFields);

  return (
    <PublishModal
      title={writeFields.title}
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <PublishModalForm
        fields={writeFields}
        onChangeFields={onChangeFields}
      />
    </PublishModal>
  );
}

export default PublishModalContainer;
