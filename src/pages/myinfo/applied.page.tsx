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
        title="신청한 팀 - soople"
        openGraph={{
          title: '신청한 팀 - soople',
          url: `${process.env.NEXT_PUBLIC_ORIGIN}/myinfo/applied`,
        }}
      />
      <AppliedGroupsContainer />
    </>
  );
}

export default AppliedPage;

AppliedPage.getLayout = getMyInfoLayout('applied');
