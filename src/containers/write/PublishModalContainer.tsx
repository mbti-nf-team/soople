import React, { ReactElement, useCallback } from 'react';
import { useUnmount } from 'react-use';

import { useRecoilState, useResetRecoilState } from 'recoil';

import PublishModal from '@/components/write/PublishModal';
import PublishModalForm from '@/components/write/PublishModalForm';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import usePublishNewGroup from '@/hooks/api/group/usePublishNewGroup';
import { KeyPair } from '@/models';
import { Profile } from '@/models/auth';
import { WriteFields } from '@/models/group';
import { writeFieldsState } from '@/recoil/group/atom';
import { publishModalVisibleState } from '@/recoil/modal/atom';

function PublishModalContainer(): ReactElement {
  const [isVisible, setPublishModalVisible] = useRecoilState(publishModalVisibleState);
  const [writeFields, changeFields] = useRecoilState(writeFieldsState);
  const resetFields = useResetRecoilState(writeFieldsState);
  const { mutate } = usePublishNewGroup();
  const { data: profile } = useFetchUserProfile();

  const onClose = () => setPublishModalVisible(false);
  const onSubmit = useCallback(() => mutate({
    profile: profile as Profile, writeFields,
  }), [mutate, profile, writeFields]);

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
