import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useRecoilState } from 'recoil';

import PublishModal from '@/components/write/PublishModal';
import PublishModalForm from '@/components/write/PublishModalForm';
import { Profile } from '@/models/auth';
import { WriteFieldsForm } from '@/models/group';
import { publishModalVisibleState } from '@/recoil/modal/atom';
import { changeWriteFields, requestRegisterNewGroup } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth, getGroup } from '@/utils/utils';

function PublishModalContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const [isVisible, setPublishModalVisible] = useRecoilState(publishModalVisibleState);
  const user = useSelector(getAuth('user'));
  const fields = useSelector(getGroup('writeFields'));

  const onClose = () => setPublishModalVisible(false);
  const onSubmit = useCallback(() => {
    dispatch(requestRegisterNewGroup(user as Profile));
    setPublishModalVisible(false);
  }, [dispatch, user]);

  const onChangeFields = useCallback((form: WriteFieldsForm) => {
    dispatch(changeWriteFields(form));
  }, [dispatch]);

  return (
    <PublishModal
      title={fields.title}
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <PublishModalForm
        fields={fields}
        onChangeFields={onChangeFields}
      />
    </PublishModal>
  );
}

export default PublishModalContainer;
