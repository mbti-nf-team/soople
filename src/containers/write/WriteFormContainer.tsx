import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useRecoilState } from 'recoil';

import WriteForm from '@/components/write/WriteForm';
import { KeyPair } from '@/models';
import { WriteFields } from '@/models/group';
import { writeFieldsState } from '@/recoil/group/atom';
import { getAuth } from '@/utils/utils';

function WriteFormContainer(): ReactElement {
  const user = useSelector(getAuth('user'));
  const [fields, changeFields] = useRecoilState(writeFieldsState);

  const onChangeFields = useCallback((form: KeyPair<WriteFields>) => {
    changeFields((prevState) => ({ ...prevState, ...form }));
  }, [changeFields]);

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
