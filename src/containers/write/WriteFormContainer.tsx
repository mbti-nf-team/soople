import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';

import WriteForm from '@/components/write/WriteForm';
import { WriteFieldsForm } from '@/models/group';
import { changeWriteFields } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth, getGroup } from '@/utils/utils';

function WriteFormContainer(): ReactElement {
  const user = useSelector(getAuth('user'));
  const fields = useSelector(getGroup('writeFields'));
  const dispatch = useAppDispatch();

  const onChangeFields = useCallback((form: WriteFieldsForm) => {
    dispatch(changeWriteFields(form));
  }, [dispatch]);

  if (!user) {
    return <div>로그인 후 이용해주세요!</div>;
  }

  return (
    <WriteForm
      fields={fields}
      onChange={onChangeFields}
    />
  );
}

export default WriteFormContainer;
