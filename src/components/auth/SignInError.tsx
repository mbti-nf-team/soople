import { ReactElement } from 'react';

import styled from '@emotion/styled';

import { subtitle1Font } from '@/styles/fontStyles';

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
  ${subtitle1Font(true)};
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.warning};
  text-align: center;
  color: ${({ theme }) => theme.background};
`;
