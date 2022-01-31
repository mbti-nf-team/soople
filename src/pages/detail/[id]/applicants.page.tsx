import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import nookies from 'nookies';

import ApplicationStatusContainer from '@/containers/applicants/ApplicationStatusContainer';
import ApplicationStatusHeaderContainer from '@/containers/applicants/ApplicationStatusHeaderContainer';
import { GroupQuery } from '@/models';
import { setGroup } from '@/reducers/groupSlice';
import wrapper from '@/reducers/store';
import { getGroupDetail } from '@/services/api/group';
import firebaseAdmin from '@/services/firebase/firebaseAdmin';

export const getServerSideProps: GetServerSideProps = wrapper
  .getServerSideProps(({ dispatch }) => async (context) => {
    const { id } = context.params! as GroupQuery;

    try {
      const cookies = nookies.get(context);
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const group = await getGroupDetail(id);

      if (!group) {
        return {
          notFound: true,
        };
      }

      if (group.isCompleted) {
        return {
          redirect: {
            permanent: false,
            destination: '/?error=unauthenticated',
          },
          props: {},
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

      dispatch(setGroup(group));

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
