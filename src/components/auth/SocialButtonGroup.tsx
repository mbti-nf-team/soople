import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { signIn } from 'next-auth/client';

import GithubIcon from '../../assets/icons/img_logo_github.svg';
import GoogleIcon from '../../assets/icons/img_logo_google.svg';
import KakaoIcon from '../../assets/icons/img_logo_kakao.svg';

function SocialButtonGroup(): ReactElement {
  return (
    <SocialButtonGroupWrapper>
      <h4>소셜 계정으로 계속하기</h4>
      <GoogleIcon
        data-testid="google-icon"
        onClick={() => signIn('google')}
      />
      <GithubIcon
        data-testid="github-icon"
        onClick={() => signIn('github')}
      />
      <KakaoIcon
        data-testid="kakao-icon"
        onClick={() => signIn('kakao')}
      />
    </SocialButtonGroupWrapper>
  );
}

export default SocialButtonGroup;

const SocialButtonGroupWrapper = styled.div`
  h4 {
    margin: 1rem 0;
  }

  svg {
    cursor: pointer;
    margin-right: 1rem;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
