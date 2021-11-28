import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useUnmount } from 'react-use';

import { useRouter } from 'next/router';

import RegisterForm from '@/components/RegisterForm';
import { RegisterAdditionalForm } from '@/models/auth';
import { clearAuth, saveUserProfile } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth } from '@/utils/utils';

function RegisterContainer(): ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useSelector(getAuth('auth'));

  const onSubmit = (formData: RegisterAdditionalForm) => {
    dispatch(saveUserProfile({
      ...auth,
      ...formData,
    }));

    router.replace('/');
  };

  useUnmount(() => dispatch(clearAuth()));

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
