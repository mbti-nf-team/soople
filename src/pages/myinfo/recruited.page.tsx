import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import RecruitedPostsContainer from '@/containers/myInfo/RecruitedPostsContainer';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function RecruitedPage(): ReactElement {
  return (
    <RecruitedPostsContainer />
  );
}

export default RecruitedPage;

RecruitedPage.getLayout = getMyInfoLayout('recruited');
