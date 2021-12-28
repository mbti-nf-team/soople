import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import palette from '@/styles/palette';

interface Props {
  error: string;
}

function SignInError({ error }: Props): ReactElement | null {
  if (!error) {
    return null;
  }

  return (
    <>
      {error === 'OAuthAccountNotLinked' ? (
        <ErrorBlock>
          이미 가입된 이메일입니다.
        </ErrorBlock>
      ) : (
        <ErrorBlock>
          로그인에 실패하였습니다.
        </ErrorBlock>
      )}
    </>
  );
}

export default SignInError;

const ErrorBlock = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${palette.warning};
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  color: ${palette.background};
`;
