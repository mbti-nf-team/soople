import { ReactElement } from 'react';

import { getSession } from 'next-auth/client';

import SignUpContainer from '@/containers/auth/SignUpContainer';
import { setUser } from '@/reducers/authSlice';
import wrapper from '@/reducers/store';
import Layout from '@/styles/Layout';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { callbackUrl } = context.query;

  const session = await getSession(context);

  if (!callbackUrl && session) {
    store.dispatch(setUser(session.user));
  }

  return {
    props: { session },
  };
});

function SignUpPage(): ReactElement {
  return (
    <Layout>
      <SignUpContainer />
    </Layout>
  );
}

export default SignUpPage;
