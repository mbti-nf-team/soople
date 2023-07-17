import { ReactElement, Suspense } from 'react';

import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { ClientOnly } from '@nft-team/react';

import AlarmsSkeletonLoader from '@/components/alarm/AlarmsSkeletonLoader';
import ErrorBoundary from '@/components/common/errorBoundary/ErrorBoundary';
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
          <ErrorBoundary>
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
