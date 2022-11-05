import React, { ReactElement, Suspense } from 'react';

import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import ClientOnly from '@/components/common/ClientOnly';
import MyGroupsSkeletonLoader from '@/components/myInfo/MyGroupsSkeletonLoader';
import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

const RecruitedGroupsContainer = dynamic(() => import('@/containers/myInfo/RecruitedGroupsContainer'), { suspense: true });

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
      <ClientOnly>
        <Suspense fallback={<MyGroupsSkeletonLoader />}>
          <RecruitedGroupsContainer />
        </Suspense>
      </ClientOnly>
    </>
  );
}

export default RecruitedPage;

RecruitedPage.getLayout = getMyInfoLayout('recruited');
