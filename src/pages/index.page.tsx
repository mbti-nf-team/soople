import React, { ReactElement } from 'react';

import { getSession } from 'next-auth/client';

import HeaderContainer from '@/containers/common/HeaderContainer';
import RecruitPostsContainer from '@/containers/home/RecruitPostsContainer';
import StatusBarContainer from '@/containers/home/StatusBarContainer';
import { setUser } from '@/reducers/authSlice';
import wrapper from '@/reducers/store';
import Layout from '@/styles/Layout';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const session = await getSession(context);

  if (session) {
    store.dispatch(setUser(session.user));
  }

  return {
    props: { session },
  };
});

function HomePage(): ReactElement {
  return (
    <>
      <HeaderContainer />
      <Layout>
        <StatusBarContainer />
        <RecruitPostsContainer />
      </Layout>
    </>
  );
}

export default HomePage;
