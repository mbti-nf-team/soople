import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import nookies from 'nookies';

import ApplicationStatusContainer from '@/containers/applicants/ApplicationStatusContainer';
import ApplicationStatusHeaderContainer from '@/containers/applicants/ApplicationStatusHeaderContainer';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';
import { GroupQuery } from '@/models';
import { Group } from '@/models/group';
import { getGroupDetail } from '@/services/api/group';
import firebaseAdmin from '@/services/firebase/firebaseAdmin';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params! as GroupQuery;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<Group | null, FirebaseError>(['group', id], () => getGroupDetail(id));
  const group = queryClient.getQueryData<Group | null>(['group', id]);

  if (!group) {
    return {
      notFound: true,
    };
  }

  if (group.isCompleted) {
    return {
      redirect: {
        permanent: false,
        destination: `/detail/${group.groupId}/?error=already-completed`,
      },
      props: {},
    };
  }

  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

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

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
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
};

function ApplicantsPage(): ReactElement {
  const { data: group } = useFetchGroup();

  return (
    <>
      <NextSeo
        title="신청현황 보기 - soople"
        openGraph={{
          title: '신청현황 보기 - soople',
          url: `${process.env.NEXT_PUBLIC_ORIGIN}/detail/${group.groupId}/applicants`,
        }}
      />
      <ApplicationStatusHeaderContainer />
      <ApplicationStatusContainer />
    </>
  );
}

export default ApplicantsPage;
