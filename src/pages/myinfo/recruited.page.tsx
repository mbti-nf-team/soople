import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function RecruitedPage(): ReactElement {
  return (
    <EmptyStateArea
      emptyText="모집한 팀이 없어요."
      buttonText="팀 모집하기"
      href="/write"
      marginTop="80px"
    />
  );
}

export default RecruitedPage;

RecruitedPage.getLayout = getMyInfoLayout('recruited');
