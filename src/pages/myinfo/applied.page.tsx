import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import AppliedGroupsContainer from '@/containers/myInfo/AppliedGroupsContainer';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function AppliedPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="soople - 내 정보, 신청한 팀"
      />
      <AppliedGroupsContainer />
    </>
  );
}

export default AppliedPage;

AppliedPage.getLayout = getMyInfoLayout('applied');
