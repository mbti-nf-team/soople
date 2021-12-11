import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';

import PublishModal from '@/components/new/PublishModal';
import PublishModalForm from '@/components/new/PublishModalForm';
import { WriteFieldsForm } from '@/models/group';
import { changeWriteFields, requestRegisterNewGroup, setPublishModalVisible } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getGroup } from '@/utils/utils';

function PublishModalContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const isVisible = useSelector(getGroup('isVisible'));

  const onClose = useCallback(() => dispatch(setPublishModalVisible(false)), [dispatch]);
  const onSubmit = useCallback(() => dispatch(requestRegisterNewGroup()), [dispatch]);

  const onChangeFields = useCallback((form: WriteFieldsForm) => {
    dispatch(changeWriteFields(form));
  }, [dispatch]);

  return (
    <PublishModal
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <PublishModalForm
        onChangeFields={onChangeFields}
      />
    </PublishModal>
  );
}

export default PublishModalContainer;
