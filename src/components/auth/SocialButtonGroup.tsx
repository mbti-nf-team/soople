import { ReactElement } from 'react';

import styled from '@emotion/styled';

import { githubProvider, googleProvider, signInRedirectOAuth } from '@/services/firebase';

import GithubIcon from '../../assets/icons/img_logo_github.svg';
import GoogleIcon from '../../assets/icons/img_logo_google.svg';
import KakaoIcon from '../../assets/icons/img_logo_kakao.svg';

function SocialButtonGroup(): ReactElement {
  return (
    <SocialButtonGroupWrapper>
      <h4>소셜 계정으로 계속하기</h4>
      <GoogleIcon
        data-testid="google-icon"
        onClick={() => signInRedirectOAuth(googleProvider)}
      />
      <KakaoIcon
        data-testid="kakao-icon"
      />
      <GithubIcon
        data-testid="github-icon"
        onClick={() => signInRedirectOAuth(githubProvider)}
      />
    </SocialButtonGroupWrapper>
  );
}

export default SocialButtonGroup;

const SocialButtonGroupWrapper = styled.div`
  h4 {
    text-align: center;
    margin: 1rem 0;
    font-weight: bold;
  }

  svg {
    cursor: pointer;
    margin-right: 1rem;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
