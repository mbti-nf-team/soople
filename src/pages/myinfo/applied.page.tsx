import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function AppliedPage(): ReactElement {
  return (
    <EmptyStateArea
      emptyText="신청한 팀이 없어요."
      buttonText="팀 살펴보기"
      href="/"
      marginTop="80px"
    />
  );
}

export default AppliedPage;

AppliedPage.getLayout = getMyInfoLayout('applied');
