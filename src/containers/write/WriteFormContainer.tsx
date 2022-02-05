import React, { ReactElement, useCallback } from 'react';

import { useRecoilState } from 'recoil';

import WriteForm from '@/components/write/WriteForm';
import useGetUser from '@/hooks/api/auth/useGetUser';
import { KeyPair } from '@/models';
import { WriteFields } from '@/models/group';
import { writeFieldsState } from '@/recoil/group/atom';

function WriteFormContainer(): ReactElement {
  const { data: user } = useGetUser();
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
