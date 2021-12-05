import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useSession } from 'next-auth/client';

import NewWriteForm from '@/components/new/NewWriteForm';
import { WriteFieldsKey } from '@/models/group';
import { changeWriteFields } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getGroup } from '@/utils/utils';

function NewWriteFormContainer(): ReactElement {
  const [session, loading] = useSession();
  const fields = useSelector(getGroup('writeFields'));
  const dispatch = useAppDispatch();

  const onChangeFields = useCallback((form: WriteFieldsKey) => {
    dispatch(changeWriteFields(form));
  }, [dispatch]);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (!session) {
    return <div>로그인 후 이용해주세요!</div>;
  }

  return (
    <NewWriteForm
      fields={fields}
      onChange={onChangeFields}
    />
  );
}

export default NewWriteFormContainer;
