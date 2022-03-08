import React, { ReactElement, useCallback } from 'react';
import { useUnmount } from 'react-use';

import { useHelpers, useRemirrorContext } from '@remirror/react';
import { useRecoilState, useResetRecoilState } from 'recoil';

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
  const { getState } = useRemirrorContext();
  const { getHTML } = useHelpers();

  const onClose = () => setPublishModalVisible(false);

  const onSubmit = useCallback(() => {
    mutate({
      profile: profile as Profile,
      writeFields: {
        ...writeFields,
        content: getHTML(getState()),
      },
    });
  }, [mutate, profile, writeFields, getHTML, getState]);

  const onChangeFields = useCallback((form: KeyPair<WriteFields>) => changeFields((prevState) => ({
    ...prevState, ...form,
  })), [changeFields]);

  useUnmount(resetFields);

  return (
    <PublishModalForm
      fields={writeFields}
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={onSubmit}
      onChangeFields={onChangeFields}
    />
  );
}

export default PublishModalContainer;
