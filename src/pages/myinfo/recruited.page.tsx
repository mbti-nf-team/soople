import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import RecruitedGroupsContainer from '@/containers/myInfo/RecruitedGroupsContainer';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function RecruitedPage(): ReactElement {
  return (
    <RecruitedGroupsContainer />
  );
}

export default RecruitedPage;

RecruitedPage.getLayout = getMyInfoLayout('recruited');
