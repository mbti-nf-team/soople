import { ParsedUrlQuery } from 'querystring';

import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import nookies from 'nookies';

import ApplicationStatusContainer from '@/containers/applicants/ApplicationStatusContainer';
import ApplicationStatusHeaderContainer from '@/containers/applicants/ApplicationStatusHeaderContainer';
import { setGroupId } from '@/reducers/groupSlice';
import wrapper from '@/reducers/store';
import { getGroupDetail } from '@/services/api/group';
import firebaseAdmin from '@/services/firebase/firebaseAdmin';

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = wrapper
  .getServerSideProps(({ dispatch }) => async (context) => {
    const { id } = context.params! as Params;

    try {
      const cookies = nookies.get(context);
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

      const group = await getGroupDetail(id);

      if (!group) {
        return {
          notFound: true,
        };
      }

      const isWriter = token.uid === group.writer.uid;

      if (!isWriter) {
        return {
          redirect: {
            permanent: false,
            destination: '/?error=unauthenticated',
          },
          props: {},
        };
      }

      dispatch(setGroupId(group.groupId));

      return {
        props: {},
      };
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: '/?error=unauthenticated',
        },
        props: {},
      };
    }
  });

function ApplicantsPage(): ReactElement {
  return (
    <>
      <ApplicationStatusHeaderContainer />
      <ApplicationStatusContainer />
    </>
  );
}

export default ApplicantsPage;
