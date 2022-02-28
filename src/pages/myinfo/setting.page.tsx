import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import MyInfoSettingContainer from '@/containers/myInfo/MyInfoSettingContainer';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function SettingPage(): ReactElement {
  return (
    <MyInfoSettingContainer />
  );
}

export default SettingPage;

SettingPage.getLayout = getMyInfoLayout('setting');
