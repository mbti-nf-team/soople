import React, { ReactElement, Suspense } from 'react';

import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import ClientOnly from '@/components/common/ClientOnly';
import MyGroupsSkeletonLoader from '@/components/myInfo/MyGroupsSkeletonLoader';
import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

const AppliedGroupsContainer = dynamic(() => import('@/containers/myInfo/AppliedGroupsContainer'), { suspense: true });

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
      <ClientOnly>
        <Suspense fallback={<MyGroupsSkeletonLoader />}>
          <AppliedGroupsContainer />
        </Suspense>
      </ClientOnly>
    </>
  );
}

export default AppliedPage;

AppliedPage.getLayout = getMyInfoLayout('applied');
