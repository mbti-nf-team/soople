import { ParsedUrlQuery } from 'querystring';

import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import HeaderContainer from '@/containers/common/HeaderContainer';
import CommentsContainer from '@/containers/detail/CommentsContainer';
import DetailContentsContainer from '@/containers/detail/DetailContentsContainer';
import DetailHeaderContainer from '@/containers/detail/DetailHeaderContainer';
import { setGroup } from '@/reducers/groupSlice';
import wrapper from '@/reducers/store';
import { getGroupDetail } from '@/services/api/group';

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = wrapper
  .getServerSideProps((store) => async (context) => {
    const { id } = context.params! as Params;

    if (!id) {
      return {
        notFound: true,
      };
    }

    const group = await getGroupDetail(id);

    if (!group) {
      return {
        notFound: true,
      };
    }

    store.dispatch(setGroup(group));

    return {
      props: {},
    };
  });

function DetailPage(): ReactElement {
  return (
    <>
      <HeaderContainer />
      <DetailHeaderContainer />
      <DetailContentsContainer />
      <CommentsContainer />
    </>
  );
}

export default DetailPage;
