import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import RemirorEditorProvider from '@/components/write/RemirorEditorProvider';
import PublishModalContainer from '@/containers/write/PublishModalContainer';
import WriteFormContainer from '@/containers/write/WriteFormContainer';
import WriteHeaderContainer from '@/containers/write/WriteHeaderContainer';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';
import { DetailLayout } from '@/styles/Layout';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function WritePage(): ReactElement {
  return (
    <>
      <NextSeo
        title="팀 모집하기 - soople"
        openGraph={{
          title: '팀 모집하기 - soople',
          url: `${process.env.NEXT_PUBLIC_ORIGIN}/write`,
        }}
      />
      <WriteHeaderContainer />
      <DetailLayout>
        <RemirorEditorProvider>
          <WriteFormContainer />
          <PublishModalContainer />
        </RemirorEditorProvider>
      </DetailLayout>
    </>
  );
}

export default WritePage;
