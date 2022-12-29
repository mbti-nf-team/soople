import React, { ReactElement, Suspense } from 'react';

import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import AlarmsSkeletonLoader from '@/components/alarm/AlarmsSkeletonLoader';
import ClientOnly from '@/components/common/ClientOnly';
import ErrorBoundary from '@/components/common/ErrorBoundary';
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
          <ErrorBoundary errorMessage="알람을 불러오는데 실패했어요!">
            <Suspense fallback={<AlarmsSkeletonLoader />}>
              <AlarmListContainer />
            </Suspense>
          </ErrorBoundary>
        </ClientOnly>
      </DetailLayout>
    </>
  );
}

export default AlarmPage;
