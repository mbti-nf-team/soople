import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import AlarmListContainer from '@/containers/alarm/AlarmListContainer';
import HeaderContainer from '@/containers/common/HeaderContainer';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';
import { DetailLayout } from '@/styles/Layout';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function AlarmPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="soople - 알람"
      />
      <HeaderContainer />
      <DetailLayout>
        <AlarmListContainer />
      </DetailLayout>
    </>
  );
}

export default AlarmPage;
