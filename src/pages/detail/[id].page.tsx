import React, { ReactElement } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import { FirebaseError } from 'firebase/app';
import { GetServerSideProps } from 'next';

import HeaderContainer from '@/containers/common/HeaderContainer';
import CommentsContainer from '@/containers/detail/CommentsContainer';
import DetailContentsContainer from '@/containers/detail/DetailContentsContainer';
import DetailHeaderContainer from '@/containers/detail/DetailHeaderContainer';
import { GroupQuery } from '@/models';
import { Group } from '@/models/group';
import { getGroupDetail } from '@/services/api/group';
import { DetailLayout } from '@/styles/Layout';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params! as GroupQuery;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<Group | null, FirebaseError>(['group', id], () => getGroupDetail(id));
  const group = queryClient.getQueryData<Group | null>(['group', id]);

  if (!group) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

function DetailPage(): ReactElement {
  return (
    <>
      <HeaderContainer />
      <DetailLayout>
        <DetailHeaderContainer />
        <DetailContentsContainer />
        <CommentsContainer />
      </DetailLayout>
    </>
  );
}

export default DetailPage;
