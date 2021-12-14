import { ParsedUrlQuery } from 'querystring';

import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import DetailContentsContainer from '@/containers/detail/DetailContentsContainer';
import DetailHeaderContainer from '@/containers/detail/DetailHeaderContainer';
import { setGroup, setWriterProfile } from '@/reducers/groupSlice';
import wrapper from '@/reducers/store';
import { getUserProfile } from '@/services/api/auth';
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

    const profile = await getUserProfile(group.writerUid);

    store.dispatch(setGroup(group));
    store.dispatch(setWriterProfile(profile));

    return {
      props: {},
    };
  });

function DetailPage(): ReactElement {
  return (
    <>
      <DetailHeaderContainer />
      <DetailContentsContainer />
    </>
  );
}

export default DetailPage;
