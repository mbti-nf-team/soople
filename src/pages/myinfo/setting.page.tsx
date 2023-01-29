import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import MyInfoSettingContainer from '@/containers/myInfo/MyInfoSettingContainer';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function SettingPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="내 정보 수정 - soople"
        openGraph={{
          title: '내 정보 수정 - soople',
          url: `${process.env.NEXT_PUBLIC_ORIGIN}/myinfo/setting`,
        }}
      />
      <MyInfoSettingContainer />
    </>
  );
}

export default SettingPage;

SettingPage.getLayout = getMyInfoLayout('setting');
