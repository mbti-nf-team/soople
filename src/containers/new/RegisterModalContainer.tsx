import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';

import RegisterModal from '@/components/new/RegisterModal';
import RegisterModalForm from '@/components/new/RegisterModalForm';
import { requestRegisterNewGroup, setRegisterModalVisible } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getGroup } from '@/utils/utils';

function RegisterModalContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const isVisible = useSelector(getGroup('isVisible'));

  const onClose = useCallback(() => dispatch(setRegisterModalVisible(false)), [dispatch]);
  const onSubmit = useCallback(() => dispatch(requestRegisterNewGroup()), [dispatch]);

  return (
    <RegisterModal
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <RegisterModalForm />
    </RegisterModal>
  );
}

export default RegisterModalContainer;
