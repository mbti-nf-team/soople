import { ReactElement, useCallback } from 'react';

import styled from '@emotion/styled';
import { User } from 'firebase/auth';

import SignUpForm from '@/components/auth/SignUpForm';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useSignUp from '@/hooks/api/auth/useSignUp';
import { SignUpAdditionalForm } from '@/models/auth';
import { body1Font, h2Font } from '@/styles/fontStyles';
import Layout from '@/styles/Layout';
import mq from '@/styles/responsive';

function SignUpContainer(): ReactElement | null {
  const { data: user, isSuccess } = useGetUser();
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

  if (!isSuccess) {
    return null;
  }

  return (
    <SignUpFormLayout>
      <Title>시작하기</Title>
      <h4>수플을 시작하기 위해 정보를 입력해주세요.</h4>
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
  color: ${({ theme }) => theme.foreground};
`;

const SignUpFormLayout = styled(Layout)`
  ${mq({
    width: ['calc(100% - 40px)', '320px'],
  })};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > h4 {
    ${body1Font()}
    color: ${({ theme }) => theme.accent7};
    margin: 0 0 38px 0;
  }
`;
