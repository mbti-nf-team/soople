import { ReactElement } from 'react';

import { NextSeo } from 'next-seo';

import SignUpContainer from '@/containers/auth/SignUpContainer';
import HeaderContainer from '@/containers/common/HeaderContainer';

function SignUpPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="시작하기 - soople"
        openGraph={{
          title: '시작하기 - soople',
          url: `${process.env.NEXT_PUBLIC_ORIGIN}/signup`,
        }}
      />
      <HeaderContainer />
      <SignUpContainer />
    </>
  );
}

export default SignUpPage;
