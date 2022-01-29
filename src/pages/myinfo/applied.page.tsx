import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import getMyInfoLayout from '@/components/myInfo/MyInfoLayout';
import AppliedGroupsContainer from '@/containers/myInfo/AppliedGroupsContainer';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function AppliedPage(): ReactElement {
  return (
    <AppliedGroupsContainer />
  );
}

export default AppliedPage;

AppliedPage.getLayout = getMyInfoLayout('applied');
