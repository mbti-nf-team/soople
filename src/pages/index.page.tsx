import React, { ReactElement } from 'react';

import HeaderContainer from '@/containers/common/HeaderContainer';
import RecruitPostsContainer from '@/containers/home/RecruitPostsContainer';
import StatusBarContainer from '@/containers/home/StatusBarContainer';
import Layout from '@/styles/Layout';

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
