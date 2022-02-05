import React, { ReactElement, useCallback } from 'react';

import { User } from 'firebase/auth';

import SignUpForm from '@/components/auth/SignUpForm';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useSignUp from '@/hooks/api/auth/useSignUp';
import { SignUpAdditionalForm } from '@/models/auth';

function SignUpContainer(): ReactElement {
  const { data: user } = useGetUser();
  const { data: profile } = useFetchUserProfile();
  const { mutate } = useSignUp();

  const onSubmit = useCallback((formData: SignUpAdditionalForm) => {
    const { email, uid, photoURL } = user as User;

    mutate({
      email: email as string,
      uid,
      image: photoURL,
      ...formData,
    });
  }, [user, mutate]);

  if (profile) {
    return <div>이미 가입이 완료되었어요!</div>;
  }

  if (!user) {
    return <div>로그인부터 진행해주세요!</div>;
  }

  return (
    <>
      <h2>시작하기</h2>
      <h4>코너스를 시작하기 위해 정보를 입력해주세요.</h4>
      <SignUpForm
        fields={user}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default SignUpContainer;
