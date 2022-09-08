import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import HeaderContainer from '@/containers/common/HeaderContainer';
import RecruitPostsContainer from '@/containers/home/RecruitPostsContainer';
import StatusBarContainer from '@/containers/home/StatusBarContainer';
import Layout from '@/styles/Layout';
import { mq2 } from '@/styles/responsive';

function HomePage(): ReactElement {
  return (
    <>
      <HeaderContainer />
      <HomePageLayout>
        <StatusBarContainer />
        <RecruitPostsContainer />
      </HomePageLayout>
    </>
  );
}

export default HomePage;

const HomePageLayout = styled(Layout)`
  ${mq2({
    width: ['calc(100% - 40px)', 'calc(100% - 40px)', 'calc(100% - 40px)', '800px', '1040px'],
  })};
`;
