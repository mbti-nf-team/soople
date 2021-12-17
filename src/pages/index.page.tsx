import React, { ReactElement } from 'react';

import { getSession } from 'next-auth/client';

import HeaderContainer from '@/containers/common/HeaderContainer';
import FilterBarContainer from '@/containers/home/FilterBarContainer';
import RecruitPostsContainer from '@/containers/home/RecruitPostsContainer';
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

function HomePage(): ReactElement {
  return (
    <>
      <HeaderContainer />
      <FilterBarContainer />
      <RecruitPostsContainer />
    </>
  );
}

export default HomePage;
