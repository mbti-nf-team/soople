import React, { ReactElement, Suspense } from 'react';

import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import AlarmsSkeletonLoader from '@/components/alarm/AlarmsSkeletonLoader';
import ClientOnly from '@/components/common/ClientOnly';
import HeaderContainer from '@/containers/common/HeaderContainer';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';
import { DetailLayout } from '@/styles/Layout';

const AlarmListContainer = dynamic(() => import('@/containers/alarm/AlarmListContainer'), { suspense: true });

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function AlarmPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="내 알람 - soople"
        openGraph={{
          title: '내 알람 - soople',
          url: `${process.env.NEXT_PUBLIC_ORIGIN}/alarm`,
        }}
      />
      <HeaderContainer />
      <DetailLayout>
        <ClientOnly>
          <Suspense fallback={<AlarmsSkeletonLoader />}>
            <AlarmListContainer />
          </Suspense>
        </ClientOnly>
      </DetailLayout>
    </>
  );
}

export default AlarmPage;
