import { getSession } from 'next-auth/client';

import SignUpContainer from '@/containers/auth/SignUpContainer';
import { setUser } from '@/reducers/authSlice';
import wrapper from '@/reducers/store';

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

export default SignUpContainer;
