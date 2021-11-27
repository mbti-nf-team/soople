import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import RegisterForm from '@/components/RegisterForm';
import { RegisterAdditionalForm } from '@/models/auth';
import { getAuth } from '@/utils/utils';

function RegisterContainer(): ReactElement {
  const auth = useSelector(getAuth('auth'));

  const onSubmit = (formData: RegisterAdditionalForm) => { console.log(formData); };

  if (!auth) {
    return <div>로그인부터 진행해주세요!</div>;
  }

  return (
    <div>
      <h2>기본 회원 정보를 등록해주세요.</h2>
      <RegisterForm
        fields={auth}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default RegisterContainer;
