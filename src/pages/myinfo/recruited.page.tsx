import { ReactElement, Suspense } from 'react';

import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import ClientOnly from '@/components/common/ClientOnly';
import ErrorBoundary from '@/components/common/ErrorBoundary';
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
        <ErrorBoundary errorMessage="모집한 팀을 불러오는데 실패했어요!">
          <Suspense fallback={<MyGroupsSkeletonLoader />}>
            <RecruitedGroupsContainer />
          </Suspense>
        </ErrorBoundary>
      </ClientOnly>
    </>
  );
}

export default RecruitedPage;

RecruitedPage.getLayout = getMyInfoLayout('recruited');
