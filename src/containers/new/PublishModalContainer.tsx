import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useSession } from 'next-auth/client';

import PublishModal from '@/components/new/PublishModal';
import PublishModalForm from '@/components/new/PublishModalForm';
import { WriteFieldsForm } from '@/models/group';
import { changeWriteFields, requestRegisterNewGroup, setPublishModalVisible } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getGroup } from '@/utils/utils';

function PublishModalContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const [session] = useSession();
  const isVisible = useSelector(getGroup('isVisible'));
  const fields = useSelector(getGroup('writeFields'));

  const onClose = useCallback(() => dispatch(setPublishModalVisible(false)), [dispatch]);
  const onSubmit = useCallback(() => dispatch(requestRegisterNewGroup(
    session?.user.uid as string,
  )), [dispatch]);

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
