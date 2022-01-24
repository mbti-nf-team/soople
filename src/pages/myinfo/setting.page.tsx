import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function SettingPage(): ReactElement {
  return (
    <div>내 정보 수정</div>
  );
}

export default SettingPage;

SettingPage.getLayout = getMyInfoLayout('setting');
