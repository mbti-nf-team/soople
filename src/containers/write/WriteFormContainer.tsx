import React, { ReactElement, useCallback } from 'react';

import { useRecoilState } from 'recoil';

import WriteForm from '@/components/write/WriteForm';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import { KeyPair } from '@/models';
import { WriteFields } from '@/models/group';
import { writeFieldsState } from '@/recoil/group/atom';

function WriteFormContainer(): ReactElement {
  const { data: user } = useFetchUserProfile();
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
