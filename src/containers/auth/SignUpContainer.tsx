import React, { ReactElement, useCallback } from 'react';

import styled from '@emotion/styled';
import { User } from 'firebase/auth';

import SignUpForm from '@/components/auth/SignUpForm';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useSignUp from '@/hooks/api/auth/useSignUp';
import { SignUpAdditionalForm } from '@/models/auth';
import { body1Font, h2Font } from '@/styles/fontStyles';
import Layout from '@/styles/Layout';
import palette from '@/styles/palette';

function SignUpContainer(): ReactElement {
  const { data: profile } = useFetchUserProfile();
  const { data: user } = useGetUser();

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
    <SignUpFormLayout>
      <Title>시작하기</Title>
      <h4>코너스를 시작하기 위해 정보를 입력해주세요.</h4>
      <SignUpForm
        fields={user}
        onSubmit={onSubmit}
      />
    </SignUpFormLayout>
  );
}

export default SignUpContainer;

const Title = styled.div`
  ${h2Font(true)}
  margin: 8px 0;
  color: ${palette.foreground};
`;

const SignUpFormLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 320px !important;

  & > h4 {
    ${body1Font()}
    color: ${palette.accent7};
    margin: 0 0 38px 0;
  }
`;
