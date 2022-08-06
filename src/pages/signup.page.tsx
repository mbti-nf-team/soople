import { ReactElement } from 'react';

import { NextSeo } from 'next-seo';

import SignUpContainer from '@/containers/auth/SignUpContainer';
import HeaderContainer from '@/containers/common/HeaderContainer';

function SignUpPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="soople - 시작하기"
      />
      <HeaderContainer />
      <SignUpContainer />
    </>
  );
}

export default SignUpPage;
