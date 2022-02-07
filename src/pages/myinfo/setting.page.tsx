import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';
import { DetailLayout } from '@/styles/Layout';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function SettingPage(): ReactElement {
  return (
    <DetailLayout>
      <div>내 정보 수정</div>
    </DetailLayout>
  );
}

export default SettingPage;

SettingPage.getLayout = getMyInfoLayout('setting');
