import React, { lazy, ReactElement, Suspense } from 'react';

import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import AlarmsSkeletonLoader from '@/components/alarm/AlarmsSkeletonLoader';
// import AlarmListContainer from '@/containers/alarm/AlarmListContainer';
import HeaderContainer from '@/containers/common/HeaderContainer';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';
import { DetailLayout } from '@/styles/Layout';

// const AlarmListContainer = dynamic(() => import('@/containers/alarm/AlarmListContainer'), {
//   suspense: true,
// });

const AlarmListContainer = lazy(() => import('@/containers/alarm/AlarmListContainer'));

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function AlarmPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="Conners - 알람"
      />
      <HeaderContainer />
      <DetailLayout>
        <Suspense fallback={<AlarmsSkeletonLoader />}>
          <AlarmListContainer />
        </Suspense>
      </DetailLayout>
    </>
  );
}

export default AlarmPage;
