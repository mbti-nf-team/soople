import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import RecruitedGroupsContainer from '@/containers/myInfo/RecruitedGroupsContainer';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function RecruitedPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="모집한 팀 - soople"
        openGraph={{
          title: '모집한 팀 - soople',
          url: `${process.env.NEXT_PUBLIC_ORIGIN}/myinfo/recruited`,
        }}
      />
      <RecruitedGroupsContainer />
    </>
  );
}

export default RecruitedPage;

RecruitedPage.getLayout = getMyInfoLayout('recruited');
