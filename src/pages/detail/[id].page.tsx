import React, { ReactElement } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import styled from '@emotion/styled';
import { FirebaseError } from 'firebase/app';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import RecruitCompleteModal from '@/components/detail/modal/RecruitCompleteModal';
import RecruitCompleteCanvasConfetti from '@/components/detail/RecruitCompleteCanvasConfetti';
import HeaderContainer from '@/containers/common/HeaderContainer';
import CommentsContainer from '@/containers/detail/CommentsContainer';
import DetailContentsContainer from '@/containers/detail/DetailContentsContainer';
import DetailHeaderContainer from '@/containers/detail/DetailHeaderContainer';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';
import useIncreaseView from '@/hooks/api/group/useIncreaseView';
import useRenderErrorToast from '@/hooks/useRenderErrorToast';
import { GroupQuery } from '@/models';
import { Group } from '@/models/group';
import { getGroupDetail } from '@/services/api/group';
import { DetailLayout } from '@/styles/Layout';
import { removeAllHtml } from '@/utils/filter';
import { emptyAThenB } from '@/utils/utils';

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
  const { data: group } = useFetchGroup();

  const detailPageSEO = {
    title: group?.title,
    description: emptyAThenB(removeAllHtml(group?.content).slice(0, 100), group?.shortDescription),
  };

  useIncreaseView();
  useRenderErrorToast({
    errorStatus: 'already-completed',
    errorMessage: '이미 모집이 완료되었어요.',
    replaceUrl: `/detail/${group.groupId}`,
  });

  return (
    <>
      <NextSeo
        title={detailPageSEO.title}
        description={detailPageSEO.description}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_ORIGIN}${`/detail/${group.groupId}`}`,
          title: detailPageSEO.title,
          description: detailPageSEO.description,
          images: [{
            url: emptyAThenB(`${process.env.NEXT_PUBLIC_ORIGIN}/meta_tag_default_image.png`, group.thumbnail),
            width: 1200,
            height: 630,
            alt: detailPageSEO.title,
          }],
        }}
      />
      <HeaderContainer />
      <DetailPageLayout>
        <DetailHeaderContainer />
        <DetailContentsContainer />
        <CommentsContainer />
        <RecruitCompleteModal />
        <RecruitCompleteCanvasConfetti />
      </DetailPageLayout>
    </>
  );
}

export default DetailPage;

const DetailPageLayout = styled(DetailLayout)`
  @media (min-width: 700px) {
    width: 686px;
  }
  
  width: calc(100% - 2.5rem);
`;
