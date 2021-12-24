import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useUnmount } from 'react-use';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import SignUpForm from '@/components/auth/SignUpForm';
import { SignUpAdditionalForm } from '@/models/auth';
import { clearAuth, requestUpdateProfile } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth } from '@/utils/utils';

function SignUpContainer(): ReactElement {
  const [session] = useSession();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector(getAuth('user'));

  useUnmount(() => dispatch(clearAuth()));

  if (!session) {
    return <div>로그인부터 진행해주세요!</div>;
  }

  const onSubmit = (formData: SignUpAdditionalForm) => {
    const { email, uid, image } = session.user;

    dispatch(requestUpdateProfile({
      email,
      uid,
      image,
      ...formData,
    }));

    router.replace('/');
  };

  if (user) {
    return <div>이미 가입이 완료되었어요!</div>;
  }

  return (
    <>
      <h2>시작하기</h2>
      <h4>코너스를 시작하기 위해 정보를 입력해주세요.</h4>
      <SignUpForm
        fields={session.user}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default SignUpContainer;
