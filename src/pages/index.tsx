import { getSession } from 'next-auth/client';

import Home from '@/containers/Home/HomeContainer';
import { setUser } from '@/reducers/authSlice';
import wrapper from '@/reducers/store';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const session = await getSession(context);

  if (session) {
    store.dispatch(setUser(session.user));
  }

  return {
    props: { session },
  };
});

export default Home;
