import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useUnmount } from 'react-use';

import { useRouter } from 'next/router';

import SignUpForm from '@/components/auth/SignUpForm';
import { SignUpAdditionalForm } from '@/models/auth';
import { clearAuth, requestUserProfile } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth } from '@/utils/utils';

function SignUpContainer(): ReactElement {
  const user = useSelector(getAuth('user'));
  const auth = useSelector(getAuth('auth'));

  const router = useRouter();
  const dispatch = useAppDispatch();

  useUnmount(() => dispatch(clearAuth()));

  if (user) {
    return <div>이미 가입이 완료되었어요!</div>;
  }

  if (!auth) {
    return <div>로그인부터 진행해주세요!</div>;
  }

  const onSubmit = (formData: SignUpAdditionalForm) => {
    const { email, uid, image } = auth;

    dispatch(requestUserProfile({
      email,
      uid,
      image,
      ...formData,
    }));

    router.replace('/');
  };

  return (
    <>
      <h2>시작하기</h2>
      <h4>코너스를 시작하기 위해 정보를 입력해주세요.</h4>
      <SignUpForm
        fields={auth}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default SignUpContainer;
