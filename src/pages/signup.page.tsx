import { ReactElement } from 'react';

import type { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import SignUpContainer from '@/containers/auth/SignUpContainer';
import HeaderContainer from '@/containers/common/HeaderContainer';
import firebaseAdmin from '@/services/firebase/firebaseAdmin';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authenticatedProps = await authenticatedServerSideProps(context);

  if (!authenticatedProps.props?.userUid) {
    return authenticatedProps;
  }

  try {
    const user = await firebaseAdmin.firestore().collection('users').doc(authenticatedProps.props.userUid).get();

    if (user.exists) {
      return {
        redirect: {
          permanent: false,
          destination: '/?error=unauthenticated',
        },
        props: {},
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/?error=unauthenticated',
      },
      props: {},
    };
  }
};

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
